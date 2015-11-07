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

					res.send( JSON.stringify(data) );

				}).catch(function(){
					res.send("someething happened;");
				});

		}
	},

	{
		method: "GET",
		path: "/posts/",
		handler : function(req, res){

			req.model.getPosts()

				.then(function(posts){

					res.send( req.interface.render('posts',{
						posts: posts
					}));
				});





		}
	}
];
