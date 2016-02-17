module.exports = [

	/**
	*	Admin and web GET homepage
	*/
	{
		access: {
			sockets: ["ADMIN", "REGISTERED","PUBLIC"],
			interfaces: ["web","admin"]
		},
		method: 'GET',
		path: '/',
		handler :  function (req, res) {


			req.interface.is('admin') &&
				req.model.getNotifications()
				.then(function(notifications){
					res.send(  req.interface.render('admin_panel', {
						notifications: notifications
					}));
				},function(){
					res.send( req.interface.to("default").render("500",  {err_object: arguments}) );
				});

			req.interface.is("web") &&
				res.send( req.interface.render('homepage', {
					user_token : req.auth.token
				}) );

		},
		access_violation : function(req, res){
			res.send( req.interface.to("default").render("403") );
		}
	},


	/**
	*	Web GET Login Page
	*/
	{
		access: {
			sockets: ["ADMIN", "REGISTERED","PUBLIC"],
			interfaces: ["web"]
		},

		method: 'GET',
		path: '/login/',
		handler : function(req, res) {
			res.send(req.interface.render('login'));
		},
		access_violation : function(req, res){
			res.send( req.interface.to("default").render("403") );
		}
	},


	/**
	*	Web POST Login Form
	*/
	{
		access: {
			sockets: ["ADMIN", "REGISTERED","PUBLIC"],
			interfaces: ["web","admin"]
		},
		method: "POST",
		path: '/login/',
		handler : function(req, res){

			req.auth.validateLogin( req.body.email, req.body.password )
			.done(function(validation_result){

				if(validation_result.valid){

					res.cookie('jwt', req.auth.getDefaultLoginJWT(validation_result.user) , { maxAge: 2 * 24 * 60 * 60 * 1000 , httpOnly: true });

					res.redirect('/?setinterface=admin');
				} else {
					res.send(req.interface.render('login',{
						validation_message : "The login failed, sad pusheen :("
					}));
				}

			},function(){
				res.send( req.interface.to("default").render("500", {err_object: arguments}) );
			});

		},
		access_violation : function(req, res){
			res.send( req.interface.to("default").render("403") );
		}
	},
	{
		access: {
			sockets: ["ADMIN", "REGISTERED","PUBLIC"],
			interfaces: ["web"]
		},
		method: 'GET',
		path: '/contact/',
		handler :  function (req, res) {
			res.send(  req.interface.render('contact') );
		},
		access_violation : function(req, res){
			res.send( req.interface.to("default").render("403") );
		}
	}
];
