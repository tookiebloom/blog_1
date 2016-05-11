module.exports = {
	port: 2111,

	default_interface : "web",

	directories : {
		routes : 			"./server/routes",
		interfaces: 		"./client/interfaces",
		helpers: 			"./server/helpers",
		factories: 			"./server/factories",
		middlewares: 		"./server/middlewares",
		repositories: 		"./server/repositories"
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
	},

	settings : {
		default_page_size : 3
	}
};
