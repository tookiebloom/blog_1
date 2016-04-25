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

	$('.tag_colors').TagColorPicker();
	$('.tag_prio').TagPrioPicker();

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



	$('[data-form-submit]').FormSubmitter();



	$('.click-confirm').on('click', function(evt){
		evt.preventDefault();
		var confirm_message = $(this).attr('data-confirm-message') || 'Are you sure?';
		var result = confirm( confirm_message );

		if(result){

			//TODO: FIX THIS!!!!!!!!!!!!!


			$('body').trigger('show-overlay', '<i class="fa centered-m-h fa-spinner"></i>');

			$.ajax({
				url: $(this).attr('href')
			}).done(function( data ) {

				data = JSON.parse(data);

				if( data.status=="success" ){
					window.location.reload();
				} else {
					$('body').trigger('set-content-overlay', data.message);
				}

			});

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
