module.exports = [
	{
		method: 'GET',
		path: '/',
		handler :  function (req, res) {


			if( req.interface.is('admin') ){


				req.model.getNotifications()
					.then(function(notifications){
						res.send(  req.interface.render('admin_panel', {
							notifications: notifications
						}));
					});


			} else {

				res.send( req.interface.render('homepage') );

			}


		}
	},
	{
		method: 'POST',
		path: '/',
		handler : function(req, res) {



		}
	}
];
