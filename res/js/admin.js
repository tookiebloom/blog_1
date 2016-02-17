//INITIALIZE tinimce
tinymce.init({
	selector:'textarea.post-body',
	min_height: 300,
	plugins: "image imagetools"
});


$(function(){

	$('body').Overlay();

	$('.add-media').MediaSelect({
		test: 'doizece'
	});

	$('.tag-picker').TagPicker();

	$('.notification-container .notification .dismiss').on('click', function(evt){
		evt.preventDefault();
		evt.stopPropagation();



		var $notif = $(this).closest('.notification');
		var notif_id = $(this).attr('data-notif-id');
		var $icon = $(this).find('i');


		$.ajax({
			url: "/dismisss_notification/?notif_id=" + notif_id,

			beforeSend: function(){
				$icon.removeClass('fa-times').addClass('fa-spinner');
			}
		}).done(function( data ) {

			data = JSON.parse(data);


			if( data.status=="success" ){
				$notif.removeClass('green').removeClass('red').removeClass('orange').addClass('green').html( data.message );

			}

		});

	});



	$('[data-form-submit]').on('click', function(evt){
		evt.preventDefault();
		var selector = $(this).attr('data-form-submit');
		$(selector).submit();
	});


	$('.media-content .img-wrapper').on('click', function(e){
		$('body').trigger('show-overlay', $(this).find('img').attr('src'));
	});

	$('.click-confirm').on('click', function(evt){
		var confirm_message = $(this).attr('data-confirm-message') || 'Are you sure?';
		var result = confirm( confirm_message );

		if(!result){
			evt.preventDefault();
		}
	});


	$('.post-status-update').on('change', function(evt){
		var selected_option = $("option:selected", this);

		$('body').trigger('show-overlay', '<i class="fa centered-m-h fa-spinner"></i>');

		$.ajax({
			url: selected_option.attr('data-update-url')
		}).done(function( data ) {

			data = JSON.parse(data);

			if( data.status=="success" ){
				$('body').trigger('hide-overlay');
			} else {
				$('body').trigger('set-content-overlay', data.message);
			}

		});

	});
});
