var ObjectID = require('mongodb').ObjectID;

module.exports = [
	/**
	*	Admin POST "Async File upload".
	*/

	{
		access: {
			sockets: ["ADMIN", "REGISTERED", "PUBLIC"],
			interfaces: ["admin"]
		},
		method: "POST",
		path: "/system/async_file_upload/",
		handler: function(req, res){

			req.media.processMediaFiles( req.files )

			.then(function(file_arrays){

				req.model.addMedia(  file_arrays.valid )
				.then(function(insert_report) {

					res.send( req.interface.render('upload_report', file_arrays));
				})
			})

			.catch( function(err){
				res.send( req.interface.to("default").render("500",  {err_object: arguments}) );
			});

		},
		access_violation : function(req, res){
			res.send( req.interface.to("default").render("403") );
		}

	},

	/**
	*	JSON GET "Media Files".
	*/
	{
		access: {
			sockets: ["ADMIN", "REGISTERED","PUBLIC"],
			interfaces: ["admin", "web"]
		},
		method: "GET",
		path: "/system/get_media_files",

		handler : function(req, res){

			req.model.getMedia()
			.then(function(media_files){
				res.send( JSON.stringify( media_files ) );
			}).catch(function(error){

				res.send( JSON.stringify({
					status: "error",
					message: "something happened when retreiving media files",
					error: json.stringify(error)
				}));
			});

		},
		access_violation : function(req, res){
			res.send( JSON.stringify({
				status: "error",
				message: "Access violation"
			}));
		}
	},


	/*GET A PAGE OF POSTS*/
	{
		access: {
			sockets: ["ADMIN", "REGISTERED","PUBLIC"],
			interfaces: ["json", "admin", "web"]
		},
		method: "GET",
		path: "/system/get_blog_page",
		handler: function(req,res){
    		res.setHeader('Content-Type', 'application/json');

			var page_index = parseInt(req.query.pageIndex) || 0;

			req.model.getPosts({
				limit: req.model.getSettingsCache().page_size,
				skip: page_index * req.model.getSettingsCache().page_size
			})
			.then(function(posts) {

				//all the media we need
				var primary_ids = posts.reduce(function(acc, crt){
					crt.primary_image_id && acc.push(ObjectID(crt.primary_image_id));
					return acc;
				},[]);

				req.model.getMedia({ _id : {$in : primary_ids} })
				.then(function(media){

					res.send({
						status		: "success",
						posts		: posts,
						media		: media
					});
				},function(err){
					res.send({
						status: "error",
						message: "something happened when retreiving media files",
						error: json.stringify(err)
					});
				});
			}, function(err){
				res.send({
					status: "error",
					message: "something happened when retreiving post files",
					error: json.stringify(err)
				});
			});
		},
		access_violation : function(req, res){
			res.send({
				status: "error",
				message: "Access violation"
			});
		}
	}
];
