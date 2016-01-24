module.exports = [
	/**
	*	Admin POST "Async File upload".
	*/

	{
		access: {
			sockets: ["ADMIN", "REGISTERED"],
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
				res.send( req.interface.to("default").render("500", arguments) );
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
			sockets: ["ADMIN", "REGISTERED"],
			interfaces: ["admin"]
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
					error: json.strinfify(error)
				}));
			});

		},
		access_violation : function(req, res){
			res.send( JSON.stringify({
				status: "error",
				message: "Access violation"
			}));
		}
	}
];
