

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


			$('.media-content').on('click', '.img-wrapper', function(e){

				var button_class = $(this).hasClass('primary-image') ? 'remove-primary' : 'set-as-primary';
				var button_label = $(this).hasClass('primary-image') ? 'Remove Primary' : 'Set as primary';
				var rendered_info  = 	$('#single_media_info').html()
										.replace( /~{src}~/g, $(this).find('img').attr('src')  )
										.replace( /~{id}~/g, $(this).attr('data-image-id')  )
										.replace( /~{button_class}~/g, button_class  )
										.replace( /~{button_label}~/g, button_label  );

				$('body').trigger('show-overlay', rendered_info);

				$('.full-size-overlay').on('click','.set-as-primary', function(evt){
					evt.preventDefault();

					var $form = $('#single_post_form')
						media_id = $(this).attr('data-media-id'),
						media_src = $(this).attr('data-media-src');

					$form.find('[name="primary_image_id"]').val(media_id);
					$form.find('.primary-image-container').html(
						$('<img >').attr('src', media_src)
					);

					$('.post-buttons.single-post  .media-content .img-wrapper').removeClass('primary-image');
					$('.post-buttons.single-post  .media-content').find('[data-image-id="'+media_id+'"]').addClass('primary-image');
					$('body').trigger('hide-overlay');
				});

				$('.full-size-overlay').on('click','.remove-primary', function(evt){
					evt.preventDefault();

					var $form = $('#single_post_form')

					$form.find('[name="primary_image_id"]').val('');
					$form.find('.primary-image-container').html('');

					$('.post-buttons.single-post  .media-content .img-wrapper').removeClass('primary-image');
					$('body').trigger('hide-overlay');
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







/**
	Form Submitter
*/
;(function ($, window, document, undefined) {

    var pluginName = "FormSubmitter",
        dataKey = "plugin_" + pluginName;


    var FormSubmitter = function (el, options) {
        var $el = $(el),
			fs = this;
        var config = {
			validation_string : $el.data('validation'),
			$form : $( $el.data('formSubmit') )
        };

        var _init = function(){
			fs.options = $.extend(config, options);

			setEvents();
		};


		var checkValidation = function(vstring, $form){
			if(!vstring) return []; //no errors

			var rules = vstring.split("|");

			return rules.reduce(function(errors, crt_rule){
				crt_rule = crt_rule.split(":");

				var rule_key = crt_rule[0],
					rule_val = crt_rule[1];

				switch(rule_key){
					case 'required':
						if( !$form.find(rule_val).val().trim() ) {
							errors.push( "The input that matches the selector:" + rule_val +" is required!" );
						}
					break;

					case 'is_email':
						var input_val = $form.find(rule_val).val().trim();

						if( input_val.indexOf('@') <= 0 ) {
							errors.push( "The input that matches the selector:" + rule_val + " must be an email!");
						}

					break;


					case 'match':
						var inputs_to_match = rule_val.split(',').map(function(selector){
							return $form.find(selector);
						}),
							isError = false;

						console.log( 'inputs to match', inputs_to_match );

						if( inputs_to_match.length > 0 ){
							var val = inputs_to_match[0].val();

							$.each(inputs_to_match, function(i, $input){
								if( $input.val() != val ){
									isError = true;
								}
							});
						}

						if( isError ){
							errors.push(" The inputs with the selectors:" + rule_val + " do not match!" );
						}

					break;
				};

				return errors;


			}, []);
		};


		var setEvents = function(){
			$el.on('click', function(evt){

				evt.preventDefault();

				var options = $(this).data('plugin_FormSubmitter').options;

				if( checkValidation( options.validation_string, options.$form ).length == 0 ) {
					options.$form.submit();
				}
			});
		};

		_init();
    };



    $.fn[pluginName] = function (options) {
        var plugin = this.data(dataKey);

        // has plugin instantiated ?
        if ( typeof plugin === "undefined") {
            plugin = new FormSubmitter(this, options);
            this.data(dataKey, plugin);
        }
        return plugin;
    };

}(jQuery, window, document));






/**
	Tag Color Picker
*/
;(function ($, window, document, undefined) {

    var pluginName = "TagColorPicker",
        dataKey = "plugin_" + pluginName;


    var TagColorPicker = function (el, options) {
        var $el = $(el),
			fs = this;
        var config = {

        };

        var _init = function(){
			fs.options = $.extend(config, options);

			setEvents();
		};

		var updateTagColorInput = function(){
			var tags = [];

			$el.find('span').each(function(i, el){
				tags.push( $(el).attr('data-tag-key') + "~" + ( $(el).attr('data-tag-value') || '' )   );
			});

			$el.find('input[type="hidden"]').val( tags.join("<|>") );
		};



		var setEvents = function(){
			$el.on('click','span', function(evt){
				evt.preventDefault();
				evt.stopPropagation();

				if($(this).find('ul').length > 0 ) return;

				$tag_colors = $('#tag_color_picker_options').html();
				$(this).append($tag_colors);

				if( $(this).attr('data-pinned') ) {
					$(this).find('.pin').html('Unpin');
				} else {
					$(this).find('.pin').html('Pin');
				}
			});

			$el.on('click', 'span ul li', function(evt){
				evt.preventDefault();
				evt.stopPropagation();

				var $tag = $(this).closest('span');

				if( $(this).hasClass('pin') ) {

					if( $tag.attr('data-pinned') ) {
						$tag.removeAttr('data-pinned');
					} else {
						$tag.attr('data-pinned', true);
					}

				} else { //clicked a color
					$tag.attr('data-tag-value', ($(this).attr('class') || '')  );
				}

				$(this).closest('ul').remove();
				updateTagColorInput();
			});


			$('body').on('click', function(){
				$el.find('ul').remove();
			});
		};

		_init();
    };



    $.fn[pluginName] = function (options) {
        var plugin = this.data(dataKey);

        // has plugin instantiated ?
        if ( typeof plugin === "undefined") {
            plugin = new TagColorPicker(this, options);
            this.data(dataKey, plugin);
        }
        return plugin;
    };

}(jQuery, window, document));





/**
	Tag Prio Picker
*/
;(function ($, window, document, undefined) {

    var pluginName = "TagPrioPicker",
        dataKey = "plugin_" + pluginName;


    var TagPrioPicker = function (el, options) {
        var $el = $(el),
			fs = this;
        var config = {

        };

        var _init = function(){
			fs.options = $.extend(config, options);
			setEvents();
		};

		var setEvents = function(){

			$el.on('change', 'input[type="number"]', function(evt){
				var prios = [];

				$el.find('input[type="number"]').each(function(i, el){
					prios.push( $(el).parent().attr('data-tag-key') + "~" + ( $(el).val() || '0' )   );
				});

				$el.find('input[type="hidden"]').val( prios.join("<|>") );
			});
		};

		_init();
    };



    $.fn[pluginName] = function (options) {
        var plugin = this.data(dataKey);

        // has plugin instantiated ?
        if ( typeof plugin === "undefined") {
            plugin = new TagPrioPicker(this, options);
            this.data(dataKey, plugin);
        }
        return plugin;
    };

}(jQuery, window, document));
