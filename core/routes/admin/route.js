var Promise = require('bluebird');

module.exports = [

	/**
	*	Admin GET "Add new post" page.
	*/
	{
		access : {
			sockets : ["ADMIN","REGISTERED"],
			interfaces : ["admin"]
		},
		method: 'GET',
		path: '/new_post/',
		handler:  function (req, res) {

			req.model.getTags()
			.then(function(tags){
				res.send(  req.interface.render('new_post', {
					tags: tags
				}));
			});
		},
		access_violation : function(req, res){
			res.send( req.interface.to("default").render("403") );
		}
	},

	/**
	*	Admin POST "add new post" form.
	*/
	{
		access: {
			sockets: ["ADMIN", "REGISTERED"],
			interfaces: ["admin"]
		},
		method: "POST",
		path: '/new_post/',
		handler: function(req, res){

			req.model.addPost(req)
			.then(function(data){

				res.redirect('/edit_post/?post_id=' +  data.ops.shift()["_id"]);

			}).catch(function(){
				res.send( req.interface.to("default").render("500",  {err_object: arguments}) );
			});
		},
		access_violation : function(req, res){
			res.send( req.interface.to("default").render("403") );
		}
	},

	/**
	*	Admin GET "Post List" Page.
	*/
	{
		access: {
			sockets: ["ADMIN", "REGISTERED"],
			interfaces: ["admin"]
		},
		method: "GET",
		path: "/posts/",
		handler : function(req, res){

			req.model.getPosts({})
			.then(function(posts){
				res.send( req.interface.render('posts',{
					posts: posts
				}));
			});
		},
		access_violation : function(req, res){
			res.send( req.interface.to("default").render("403") );
		}
	},


	/**
	*	JSON GET "Delete Post".
	*/
	{
		access: {
			sockets: ["ADMIN", "REGISTERED"],
			interfaces: ["json"]
		},
		method: "GET",
		path: '/delete_post/',
		handler : function(req, res){

			req.model.deletePost( req.query.post_id )
			.then(function(success){

				res.send( JSON.stringify({
					status: "success",
					message: "The product was deleted successfuly!"
				}));
			}).catch(function(){
				res.send( req.interface.to("default").render("500",  {err_object: arguments}) );
			});

		},
		access_violation : function(req, res){
			res.send( req.interface.to("default").render("403") );
		}
	},

	/**
	*	Admin GET "Edit Post" Page.
	*/
	{
		access: {
			sockets: ["GLOBAL", "REGISTERED"],
			interfaces: ["admin"]
		},
		method: "GET",
		path: "/edit_post/",
		handler : function(req, res){
			Promise.all([
				req.model.getPost( req.query.post_id ),
				req.model.getTags()

			]).then(function(results){
				var post = results[0].shift();
				var tags = results[1];

				post && req.model.getMedia({ _id : {$in : post.media || []} })
				.then(function(media){
					post.media_files = media;
					res.send( req.interface.render('edit_post', {
						post: post,
						tags: tags
					}) );
				});

				!post && res.send( req.interface.to("default").render("404", {
					message: "We tried to get the post with the id:"+ req.query.post_id + " and failed miserably"
				}));
			});


		},
		access_violation : function(req, res){
			res.send( req.interface.to("default").render("403") );
		}
	},

	/**
	*	Admin POST "Edit Post" Form.
	*/
	{
		access: {
			sockets: ["ADMIN", "REGISTERED"],
			interfaces: ["admin"]
		},
		method: "POST",
		path: "/edit_post/",
		handler : function(req, res){

			req.model.editPost(req, req.query.post_id)
			.then(function(){
				res.redirect('/edit_post/?post_id=' +req.query.post_id);
			}).catch(function(){
				res.send( req.interface.to("default").render("500",  {err_object: arguments}) );
			});
		},
		access_violation : function(req, res){
			res.send( req.interface.to("default").render("403") );
		}
	},

	/**
	*	Admin GET "Settings" Page.
	*/
	{
		access: {
			sockets: ["ADMIN", "REGISTERED"],
			interfaces: ["admin"]
		},
		method: "GET",
		path: "/settings/",
		handler : function(req, res){

			req.model.getNotifications()
			.then(function(notifications){
				res.send(  req.interface.render('settings', {
					notifications: notifications
				}));
			});
		},
		access_violation : function(req, res){
			res.send( req.interface.to("default").render("403") );
		}
	},

	/**
	*	JSON GET "Dismiss notification" Form.
	*/
	{
		access: {
			sockets: ["ADMIN", "REGISTERED"],
			interfaces: ["admin"]
		},
		method: "GET",
		path: "/dismisss_notification/",
		handler: function(req, res){

			req.model.dismissNotification(req.query.notif_id)
			.then(function(success){

				res.send( JSON.stringify( {
					status: "success",
					message: "The notification was deleted successfuly"
				}));

			}).catch(function(){
				res.send( req.interface.to("default").render("500",  {err_object: arguments}) );
			});


		},
		access_violation : function(req, res){
			res.send( req.interface.to("default").render("403") );
		}
	},


	/**
	*	Admin GET "Media List" Page.
	*/
	{
		access: {
			sockets: ["ADMIN", "REGISTERED"],
			interfaces: ["admin"]
		},
		method: "GET",
		path: "/media/",
		handler: function(req, res){

			req.model.getMedia()
			.then(function(media_files){
				res.send( req.interface.render('media', media_files) );
			});
		},
		access_violation : function(req, res){
			res.send( req.interface.to("default").render("403") );
		}
	},
	/**
	*	JSON GET "Edit post status".
	*/
	{
		access: {
			sockets: ["GLOBAL", "REGISTERED"],
			interfaces: ["admin"]
		},
		method: "GET",
		path: "/edit_post_status/",

		handler: function(req, res){

			req.model.editPostStatus( req.query.post_id, req.query.status )

			.then(function(edit_reponse){

				edit_reponse.result.ok &&
					res.send( JSON.stringify({
						status: "success",
						message: "the post status was successful"
					}));

				!edit_reponse.result.ok &&
					res.send( JSON.stringify({
						status: "error",
						message: "Something went wrong :( "
					}));

			}).catch(function(){
				res.send( req.interface.to("default").render("500",  {err_object: arguments}) );
			});
		},
		access_violation : function(req, res){
			res.send( req.interface.to("default").render("403") );
		}
	},

	/**
	*	JSON GET "Edit post status".
	*/
	{
		access: {
			sockets: ["GLOBAL", "REGISTERED", "ADMIN"],
			interfaces: ["admin"]
		},
		method: "GET",
		path: "/user/",

		handler: function(req, res){
			req.model.findUsers({
				email : req.auth.token.email
			})
			.then(function(users){
				res.send( req.interface.render('user', {user: users.shift()}) );
			},function(err){ //error
				res.send( req.interface.to("default").render("500",  {err_object: arguments}) );
			})

		},
		access_violation : function(req, res){
			res.send( req.interface.to("default").render("403") );
		}
	}
];
