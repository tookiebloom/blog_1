var ObjectID = require('mongodb').ObjectID,
 	Promise = require('bluebird');


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

			/**
			*/

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
				req.model.getPosts({},{
					limit: req.model.getSettingsCache().page_size
				})
				.then(function(posts) {

					//all the media we need
					var primary_ids = posts.reduce(function(acc, crt){
						crt.primary_image_id && acc.push(ObjectID(crt.primary_image_id));
						return acc;
					},[]);

					Promise.all([
						req.model.getMedia({ _id : {$in : primary_ids} }),
						req.model.getSettings(),
						req.model.getTags()
					]).then(function(results){

						res.send( req.interface.render('homepage', {
							posts		: posts,
							media		: results[0],
							settings	: results[1],
							tags		: results[2],
							auth		: req.auth
						}));
					},function(err){
						res.send( req.interface.render("500", err) );
					});
				}, function(err){
					res.send( req.interface.render("500", err) );
				});

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
						validation_message : "The login failed :("
					}));
				}

			},function(){	
				res.send(req.interface.render('login',{
					validation_message : "The login failed :("
				}));
		
			});

		},
		access_violation : function(req, res){
			res.send( req.interface.to("default").render("403") );
		}
	},


	/*
	*	Get Logout
	*/

	{

		access: {
			sockets: ["ADMIN", "REGISTERED","PUBLIC"],
			interfaces: ["web","admin"]
		},
		method: "GET",
		path: '/logout/',
		handler : function(req, res){


			res.clearCookie('jwt');
			res.clearCookie('interface');
			res.redirect('/');

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
	},


	{
		access: {
			sockets: ["ADMIN", "REGISTERED","PUBLIC"],
			interfaces: ["web","admin"]
		},
		method: 'GET',
		path: '/react/',
		handler :  function (req, res) {
			res.send(  req.interface.render('react_test') );
		},
		access_violation : function(req, res){
			res.send( req.interface.to("default").render("403") );
		}
	},




	{
		access: {
			sockets: ["ADMIN", "REGISTERED", "PUBLIC"],
			interfaces: ["web"]
		},
		method: 'GET',
		path: '/p/:permalink',
		handler : function(req, res) {

			req.model.getPost({
				permalink: req.params.permalink
			}).then(function(posts){
				if (posts.length != 0){
					var post = posts[0];

					req.model.getMedia({ _id : {$in : post.media } })

					Promise.all([
						req.model.getMedia({ _id : {$in : post.media } }),
						req.model.getSettings()
					])
					.then(function(results){
						res.send( req.interface.render('post', {
							post		: post,
							media		: results[0],
							settings	: results[1]
						}));
					}, function(){
						res.send( req.interface.to("default").render("500", {err_object: arguments}) );
					})

				} else {
					res.send( req.interface.to("default").render("404") );
				}
			})

		},
		access_violation : function(req, res) {
			res.send( req.interface.to("default").render("403") );
		}

	},

	/**
	*	Admin and web GET tag page
	*/
	{
		access: {
			sockets: ["ADMIN", "REGISTERED","PUBLIC"],
			interfaces: ["web","admin"]
		},
		method: 'GET',
		path: '/t/:tag',
		handler :  function (req, res) {

			req.model.getTags()
			.then(function(tags){



				if( tags.indexOf( req.params.tag ) == -1 ) {
					res.send( req.interface.render('404') );
					return;
				}

				req.model.getPosts({
					tags: req.params.tag
				},{
					limit: req.model.getSettingsCache().page_size
				})
				.then(function(posts) {


					//all the media we need
					var primary_ids = posts.reduce(function(acc, crt){
						crt.primary_image_id && acc.push(ObjectID(crt.primary_image_id));
						return acc;
					},[]);

					Promise.all([
						req.model.getMedia({ _id : {$in : primary_ids} }),
						req.model.getSettings()
					]).then(function(results){

						

						res.send( req.interface.render('homepage', {
							posts		: posts,
							media		: results[0],
							settings	: results[1],
							tags		: tags
						}));
					},function(err){
						res.send( req.interface.render("500", err) );
					});
				}, function(err){
					res.send( req.interface.render("500", err) );
				});


			}, function(err){
				res.send( req.interface.render("500", err) );
			})


		},
		access_violation : function(req, res){
			res.send( req.interface.to("default").render("403") );
		}
	},

];
