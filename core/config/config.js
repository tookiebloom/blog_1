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
	mongodb_db_name : "blog"

};
