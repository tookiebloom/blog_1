

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

					config.media_files = JSON.parse(data);



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
