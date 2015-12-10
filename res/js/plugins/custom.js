

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

					var media_files = JSON.parse(data);

					var rendered_media_files = "";

					$.each( media_files, function(i, el){
						rendered_media_files  += $('#single_media_file').html().replace( '~{url}~', "/"+el.url  );
					});

					var rendered_container = $('#media_files_template').html().replace('~{media}~', rendered_media_files );




					$('body').trigger('set-content-overlay', rendered_container);


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
