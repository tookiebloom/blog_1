

/**
	OVERLAY
*/
;(function ($, window, document, undefined) {

    var pluginName = "Overlay",
        dataKey = "plugin_" + pluginName;




    var Overlay = function (el, options) {
        var $el = $(el);

        var config = {
            // default option
        };

		var _init = function(){
			options = $.extend(config, options);


			setEvents();


		}

		var setEvents = function(){


			$('body').on('click','.full-size-overlay', function(e){
				console.log(e);

				if( e.target == this )
					$('body').trigger('hide-overlay');
			});

			$('body').on('show-overlay',function(evt, content){

				var $overlay = $('<div style="display: none" class="full-size-overlay"><div class="content_box"></div></div>');

				if( content ){
					$overlay.find('.content_box').append( content );

				}
				$('body').data('active_overlay', $overlay);
				$('body').append($overlay);
				setOverlayContentEvents();

				$overlay.fadeIn(300);

			});


			$('body').on('hide-overlay', function(){

				var $overlay = $('body').data('active_overlay');

				if( $overlay ){
					$overlay.fadeOut(300,function(){
						$overlay.remove();
					});

				}
			});


			$('body').on('set-content-overlay', function(evt, content){

				var $overlay = $('body').data('active_overlay');

				if( $overlay ){
					$overlay.find('.content_box').html(content);
					setOverlayContentEvents();
				}
			});

		};

		var setOverlayContentEvents = function(){

			var $overlay = $('body').data('active_overlay');

			if( $overlay ){

				$overlay.find('.hide_overlay').on('click', function(evt){
					evt.preventDefault();
					$('body').trigger('hide-overlay');
				});

			}
		};

		_init();
    };



    $.fn[pluginName] = function (options) {
        var plugin = this.data(dataKey);

        // has plugin instantiated ?
        if ( typeof plugin === "undefined") {
            plugin = new Overlay(this, options);
            this.data(dataKey, plugin);
        }
        return plugin;
    };

}(jQuery, window, document));






/**
	MEDIA SELECT
*/
;(function ($, window, document, undefined) {

    var pluginName = "MediaSelect",
        dataKey = "plugin_" + pluginName;


    var MediaSelect = function (el, options) {
        var $el = $(el);

        var config = {
            // default options
        };

        var _init = function(){
			options = $.extend(config, options);

			config.post_id = $el.data('postId');

			setEvents();

		};


		var renderImages = function(media_files){
			var rendered_media_columns = ["","","",""], crt_column, rendered_columns = "";
			var post_media = $('input[type="hidden"][name="media"]').val().split(',');
			console.log('post media',post_media);

			$.each( media_files, function(i, el){
				crt_column = i % 4;
				rendered_media_columns[crt_column]  += 	$('#single_media_file').html()
														.replace( '~{url}~', "/"+el.url  )
														.replace("~{id}~",el._id)
														.replace("~{additional_classes}~", (   post_media.indexOf(el._id) != -1 ? 'checked' :''));
			});

			$.each( rendered_media_columns, function(i, crt_column){
				rendered_columns  += $('#media_file_column').html().replace('~{media_files}~', crt_column );
			});

			return $('#media_files_template').html().replace('~{media}~', rendered_columns );
		};





		var getSelectedImages = function(){
			var selected_media_ids = [];

			$('.full-size-overlay .img-wrapper').each( function(i, el){
				if( $(el).hasClass('checked') ){
					selected_media_ids.push( $(el).data('imageId'));
				}
			});

			return selected_media_ids;
		};

		var setLayerEvents = function(){

			$('.full-size-overlay .img-wrapper').on('click', function(evt){
				$(this).toggleClass('checked');
			});

			$('.full-size-overlay .admin-button.save').on('click', function(evt){
				evt.preventDefault();

				var selected_media_ids = getSelectedImages();



				$('body').trigger('set-content-overlay', '<i class="fa centered-m-h fa-spinner"></i>');
				$('body').trigger('attached-media-to-post',  {media_ids: selected_media_ids });

				$form  = $('#single_post_form');


				$('body').trigger('hide-overlay');

			});

		};

		var setEvents = function(){

			$el.on('click', function(evt){
				evt.preventDefault();

				$('body').trigger('show-overlay', '<i class="fa centered-m-h fa-spinner"></i>');

				$.ajax({
					url: "/system/get_media_files",
					method: "get",
					type: "json"
				}).done(function(data){


					$('body').trigger('set-content-overlay', renderImages(config.media_files) );
					setLayerEvents();
				});
			});




			$('body').on('attached-media-to-post', function(evt, media){

				var selected_media = config.media_files.reduce(function(acc, crt){
					(media.media_ids.indexOf( crt._id ) != -1) && acc.push(crt);
					return acc;
				}, []);


				var rendered_images = "";

				$.each(selected_media, function(i, el){
					rendered_images  += 	$('#single_media_file').html()
											.replace( '~{url}~', "/"+el.url  )
											.replace("~{id}~",el._id)
											.replace("~{additional_classes}~",'');
				});

				$('input[type="hidden"][name="media"]').val(  media.media_ids.join(',')  );


				$('.media-content').html( rendered_images );

				$('.media-content .img-wrapper').on('click', function(e){
					$('body').trigger('show-overlay', $(this).find('img').attr('src'));
				});

			});
		};

		_init();
    };



    $.fn[pluginName] = function (options) {
        var plugin = this.data(dataKey);

        // has plugin instantiated ?
        if ( typeof plugin === "undefined") {
            plugin = new MediaSelect(this, options);
            this.data(dataKey, plugin);
        }
        return plugin;
    };

}(jQuery, window, document));




/**
	Tag Picker
*/
;(function ($, window, document, undefined) {

    var pluginName = "TagPicker",
        dataKey = "plugin_" + pluginName;


    var TagPicker = function (el, options) {
        var $el = $(el);

        var config = {
            max_options: 5
        };

        var _init = function(){
			options = $.extend(config, options);

			$el.data('tp-tags', $el.data('tags').split(',')  );
			$('body').append( $('<ul class="tp-tags-container"></ul>'));

			setEvents();

		};



		var match_string_array = function(str, arr){
			var new_arr = [];
			str = str.toLowerCase().trim();

			for( i = 0; i < arr.length; i++ ){
				var arr_value = arr[i].toLowerCase().trim();
				if( arr_value.indexOf(str) > 0 ){
					new_arr.push(arr[i]);
				}
			}


			return new_arr;
		};


		var resetContainer = function($el){
			$('.tp-tags-container').html('');

			$('.tp-tags-container').css('top', $el.offset().top );
			$('.tp-tags-container').css('left', $el.offset().left );
			$('.tp-tags-container').css('margin-top', $el.outerHeight() );
			$('.tp-tags-container').css('width', $el.outerWidth() );

			$('.tp-tags-container').show();

		};

		var setEvents = function(){
			$('body').on('click', function(){
				$('.tp-tags-container').hide();
			});

			$('.tp-tags-container').on('click','li', function(evt){
				var str_before_last_comma =  $el.val().substring(0, $el.val().lastIndexOf(',')+1 );
				$el.val(str_before_last_comma + " "+ $(this).html() +"," );
			});



			$el.on('keyup', function(evt){
				var $el = $(this);

				var matching_value = $el.val().substring($el.val().lastIndexOf(',')+1 );

				var matching_tags = match_string_array(matching_value ,  $el.data('tp-tags')  );

				resetContainer($el);

				if( matching_tags.length > 0 ){

					for( var i = 0; i < matching_tags.length; i++  ){

						var $new_opt = $('<li>'+ matching_tags[i] +'</li>');
						$('.tp-tags-container').append( $new_opt );
					}
				}
			});
		};

		_init();
    };



    $.fn[pluginName] = function (options) {
        var plugin = this.data(dataKey);

        // has plugin instantiated ?
        if ( typeof plugin === "undefined") {
            plugin = new TagPicker(this, options);
            this.data(dataKey, plugin);
        }
        return plugin;
    };

}(jQuery, window, document));
