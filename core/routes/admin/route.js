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

					console.log('add post data:', data);
					res.redirect('/edit_post/?post_id=' +  data.ops.shift()["_id"]);

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
					} else {
						res.redirect('/posts/');
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
				var post = posts.shift();

				req.model.getMedia({ _id : {$in : post.media || []} })
					.then(function(media){
						post.media_files = media;
						res.send( req.interface.render('edit_post', post) );
					});


			});

		}
	},

	{
		method: "POST",
		path: "/edit_post/",
		handler : function(req, res){

			req.model.editPost(req, req.query.post_id)
			.then(function(){
				res.redirect('/edit_post/?post_id=' +req.query.post_id);
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
			});


		}
	},

	{
		method: "GET",
		path: "/media/",
		handler: function(req, res){


			req.model.getMedia()
			.then(function(media_files){

				res.send( req.interface.render('media', media_files) );
			});
		}
	},

	{
		method: "GET",
		path: "/edit_post_status/",

		handler: function(req, res){

			req.model.editPostStatus( req.query.post_id, req.query.status )
			.then(function(edit_reponse){
				console.log(edit_reponse);

				if( edit_reponse.result.ok ){

					res.send( JSON.stringify({
						status: "success",
						message: "the post status was successful"
					}));
				} else {

					res.send( JSON.stringify({
						status: "error",
						message: "Something went wrong :( "
					}));
				}

			});
		}
	}







];
