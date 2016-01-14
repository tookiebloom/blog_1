module.exports = [
	{
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
				res.send( " errr, look at the console mofo' ");
			});

		}

	},

	{
		method: "GET",
		path: "/system/get_media_files",

		handler : function(req, res){

			req.model.getMedia()
			.then(function(media_files){
				res.send( JSON.stringify( media_files ) );
			});

		}
	}
];
