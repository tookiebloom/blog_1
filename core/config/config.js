module.exports = {
	port: 2111,



	default_interface : "web",



	directories : {
		routes : 			"./core/routes",
		interfaces: 		"./interfaces",
		helpers: 			"./core/helpers",
		factories: 			"./core/factories",
		middlewares: 		"./core/middlewares"
	},

	root_path_relateive_to_core : "../"

};
