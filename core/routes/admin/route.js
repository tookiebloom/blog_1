module.exports = [
	{
		method: 'GET',
		path: '/new_post/',
		handler:  function (req, res) {


			if( req.interface.is('admin') ){
				res.send(  req.interface.render('new_post') )
			} else {

				res.send( req.interface.render('homepage') );
			}


		}
	},

	{
		method: "POST",
		path: '/new_post/',
		handler: function(req, res){

			req.model.addPost(req)
				.then(function(data){

					res.redirect('/posts/?interface=admin');

				}).catch(function(){
					res.send("someething happened;");
				});

		}
	},

	{
		method: "GET",
		path: "/posts/",
		handler : function(req, res){

			req.model.getPosts({})
				.then(function(posts){
					res.send( req.interface.render('posts',{
						posts: posts
					}));
				});
		}
	},
	{
		method: "GET",
		path: '/delete_post/',
		handler : function(req, res){


			req.model.deletePost( req.query.post_id )
				.then(function(success){


					if( req.interface.is('json') ){

						res.send( JSON.stringify({
							status: "success",
							message: "The product was deleted successfuly!"
						}));
					};

					if(  req.interface.is('admin') ){
						res.redirect('/posts/?interface=admin');
					}

				});

		}
	},
	{
		method: "GET",
		path: "/edit_post/",
		handler : function(req, res){

			req.model.getPost( req.query.post_id )
				.then(function(posts){
					res.send(  req.interface.render('edit_post', posts[0]) );
				});

		}
	},

	{
		method: "POST",
		path: "/edit_post/",
		handler : function(req, res){

			req.model.editPost(req, req.body.edit_post_id)
				.then(function(){
					res.redirect('/posts/?interface=admin');
				}).catch(function(){
					res.send("Something happened");
				});
		}
	},

	{
		method: "GET",
		path: "/settings/",
		handler : function(req, res){

			req.model.getNotifications()
				.then(function(notifications){
					res.send(  req.interface.render('settings', {
						notifications: notifications
					}));
				});
		}
	},

	{
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
					console.log("something bad happened");
				})


		}
	}






];
