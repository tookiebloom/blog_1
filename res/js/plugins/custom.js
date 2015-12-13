

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

		var setEvents = function(){


			$el.on('click', function(evt){
				evt.preventDefault();

				$('body').trigger('show-overlay', '<i class="fa centered-m-h fa-spinner"></i>');

				$.ajax({
					url: "/system/get_media_files",
					method: "get",
					type: "json"
				}).done(function(data){

					var media_files = JSON.parse(data), crt_column, rendered_columns = "";

					var rendered_media_columns = ["","","",""];


					$.each( media_files, function(i, el){
						crt_column = i % 4;
						rendered_media_columns[crt_column]  += 	$('#single_media_file').html()
																.replace( '~{url}~', "/"+el.url  )
																.replace("~{id}~",el._id)
					});

					$.each( rendered_media_columns, function(i, crt_column){
						rendered_columns  += $('#media_file_column').html().replace('~{media_files}~', crt_column );
					});


					var rendered_container = $('#media_files_template').html().replace('~{media}~', rendered_columns );

					$('body').trigger('set-content-overlay', rendered_container);


					$('.full-size-overlay .img-wrapper').on('click', function(evt){
						$(this).toggleClass('checked');
					});

					$('.full-size-overlay .admin-button.save').on('click', function(evt){
						evt.preventDefault();


						var selected_media_ids = [];

						$('.full-size-overlay .img-wrapper').each( function(i, el){
							if( $(el).hasClass('checked') ){
								selected_media_ids.push( $(el).data('imageId'));
							}
						});

						$('body').trigger('set-content-overlay', '<i class="fa centered-m-h fa-spinner"></i>');

						$.ajax({
							url: "/system/attach_media_to_post",
							method : "post",
							type : "json",
							data: {
								post_id : config.post_id,
								media_ids : selected_media_ids
							}
						}).done(function(response){



						}).always(function(){

						});

					});


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
