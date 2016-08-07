module.exports = {
	port: process.env.OPENSHIFT_NODEJS_PORT,

	ipaddress : process.env.OPENSHIFT_NODEJS_IP,

	default_interface : "web",

	directories : {
		routes : 			"./server/routes",
		interfaces: 		"./client/interfaces",
		helpers: 			"./server/helpers",
		factories: 			"./server/factories",
		middlewares: 		"./server/middlewares",
		repositories: 		"./server/repositories"
	},

	root_path_relative_to_core : "../",

	mongodb_url : process.env.OPENSHIFT_MONGODB_DB_URL || "mongodb://localhost:27017",
	mongodb_db_name : "blog",

	media_validator: {
		max_size: 30000000, // 30 MiB
		allowed_mimetypes : ["image/jpeg","image/jpg", "image/pjpeg", "image/png", "image/bmp", "application/octet-stream", "video/avi", "image/gif"]

	},

	secrets : {
		jwt : process.env.OPENSHIFT_BLOG_JWT_SECRET || "Custom string used for encoding the JWT tokens"
	},

	settings : {
		default_page_size : 10
	},

	admin_user : {
		//username 	: "admin",
		//password	: "somepass",
		name 		: "Beni Hognogi",
		email 		: "beni@hognogi.com",
		created		: Date.now(),
		access_keys : ["ADMIN"]
	}
};
