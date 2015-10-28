var fs = require('fs');

//CORE OBJECT
module.exports = (function(){


	var CORE = {},
		i;


	//initialize config object
	var _config = require('./config/config.js');

	CORE.config = _config;


	//initialize helpers
	var helper_files =  fs.readdirSync( _config.directories.helpers );


	for( i = 0; i < helper_files.length; i++ ){

		//initialize helper
		var helper_instance = require(  _config.root_path_relateive_to_core + _config.directories.helpers + "/" + helper_files[i]  )(_config);

		//get helper name from file (remove .js )
		var last_dot_index = helper_files[i].lastIndexOf('.');
		var helper_name = helper_files[i].substr(0, last_dot_index);

		CORE[helper_name] = helper_instance;
	};


	//initialize factory
	CORE.factories = {};

	var factories_files = fs.readdirSync( _config.directories.factories );

	for( i = 0; i < factories_files.length; i++ ) {

		var factory_function = require(  _config.root_path_relateive_to_core +  _config.directories.factories + "/" + factories_files[i] )(CORE);

		//get factory name from file (remove .js )
		var last_dot_index = factories_files[i].lastIndexOf('.');
		var factory_name = factories_files[i].substr(0, last_dot_index);

		CORE.factories[factory_name] = factory_function;
	}







	CORE.getInterfaces = function(){

		var interfaces = {};

		var interface_directories = fs.readdirSync( _config.directories.interfaces );

		for( i = 0; i < interface_directories.length; i++ ){

			var interface_instance = require( _config.root_path_relateive_to_core + _config.directories.interfaces + "/" + interface_directories[i] + "/interface.js"  )(CORE);

			//get middleware name from file (remove .js )
			var last_dot_index = interface_directories[i].lastIndexOf('.');
			var interface_name = interface_directories[i].substr(0, last_dot_index);

			interfaces[ interface_name ] = interface_instance;
		}

		return interfaces;
	};




	CORE.middlewares = {};

	var middleware_directories = fs.readdirSync( _config.directories.middlewares );

	for( i = 0; i < middleware_directories.length; i++ ){

		//initialize middleware
		var middleware_function = require(  _config.root_path_relateive_to_core  + _config.directories.middlewares + "/" + middleware_directories[i] + "/middleware.js"  )(CORE);

		var middleware_name = middleware_directories[i];

		CORE.middlewares[middleware_name] = middleware_function;
	}



	CORE.router = function(_app){
		var route_directories = fs.readdirSync( _config.directories.routes ),
			i, j;

		for( i = 0; i < route_directories.length; i++ ){

			var _crt_dir = route_directories[i];
			var routes_arr = require( _config.root_path_relateive_to_core +  _config.directories.routes + "/"  + _crt_dir  + "/route.js" );


			for( j = 0; j < routes_arr.length; j++ ){

				var _method 	= routes_arr[j].method.toLowerCase();
				var _path 		= routes_arr[j].path;
				var _handler 	= routes_arr[j].handler;

				_app[_method](_path, _handler);
			}
		}
	};









	return CORE;
})();
