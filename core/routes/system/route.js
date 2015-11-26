module.exports = [
	{
		method: "POST",
		path: "/system/async_file_upload/",
		handler: function(req, res){


			res.send(  JSON.stringify( req.files )   );


		}

	}
];
