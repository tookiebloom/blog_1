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
	},

	{
		access: {
			sockets: ["ADMIN", "REGISTERED", "PUBLIC"],
			interfaces: ["admin", "web"]
		},
		method: "GET",
		path: "/test/404",
		handler: function(req,res){
			res.send( req.interface.to("default").render("404") );
		}
	},

	{
		access: {
			sockets: ["ADMIN", "REGISTERED", "PUBLIC"],
			interfaces: ["admin", "web"]
		},
		method: "GET",
		path: "/test/403",
		handler: function(req,res){
			res.send( req.interface.to("default").render("403") );
		}
	},

	{
		access: {
			sockets: ["ADMIN", "REGISTERED", "PUBLIC"],
			interfaces: ["admin", "web"]
		},
		method: "GET",
		path: "/test/500",
		handler: function(req,res){
			res.send( req.interface.to("default").render("500", {
				objkey : "This is the object value as a string",
				second_key : 432432,
				third_key : {foo:"bar", tar:321},
				fourth_key : ["te","st", 210]
			}));
		}
	}
];
