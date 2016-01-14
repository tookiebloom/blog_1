module.exports = {
	port: 2111,

	default_interface : "web",

	directories : {
		routes : 			"./core/routes",
		interfaces: 		"./interfaces",
		helpers: 			"./core/helpers",
		factories: 			"./core/factories",
		middlewares: 		"./core/middlewares",
		repositories: 		"./core/repositories"
	},

	root_path_relateive_to_core : "../",

	mongodb_url : "mongodb://localhost:27017/blog",
	mongodb_db_name : "blog",

	media_validator: {
		max_size: 30000000, // 30 MiB
		allowed_mimetypes : ["image/jpeg","image/jpg", "image/pjpeg", "image/png", "image/bmp", "application/octet-stream", "video/avi", "image/gif"]

	},

	secrets : {
		jwt : "Thisisareallybigandimportantsecret;shhhh!"
	}
};
