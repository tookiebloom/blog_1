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

			console.log(data);

			if( data.status=="success" ){
				$notif.removeClass('green').removeClass('red').removeClass('orange').addClass('green').html( data.message );

			}

		});

	});
});
