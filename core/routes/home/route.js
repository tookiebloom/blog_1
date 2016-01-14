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
		method: 'GET',
		path: '/login/',
		handler : function(req, res) {

			res.send(req.interface.render('login', {}));

		}
	},
	{
		method: "POST",
		path: '/login/',
		handler : function(req, res){

			req.auth.validateLogin( req.body.email, req.body.password )
			.done(function(validation_result){

				if(validation_result.valid){
					
					res.cookie('jwt', req.auth.getDefaultLoginJWT(validation_result.user) , { maxAge: 2 * 24 * 60 * 60 * 1000 , httpOnly: true });

					res.redirect('/');
				} else {
					res.send(req.interface.render('login',{
						validation_message : "The login failed, sad pusheen :("
					}));
				}


			});

		}
	}
];
