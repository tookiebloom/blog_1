var fs = require('fs');

//CORE OBJECT
module.exports = (function(){


	var CORE = {},
		i;


	//initialize config object
	var _config = require('./config/config.js');
	CORE.config = _config;




	var _getHelpers = function(){

		var helper_files =  fs.readdirSync( _config.directories.helpers ),
			helpers = {},
			helper_instance, i, helper_name;

		for( i = 0; i < helper_files.length; i++ ){

			//initialize helper
			helper_instance = require(  _config.root_path_relateive_to_core + _config.directories.helpers + "/" + helper_files[i]  )(_config);

			helper_name = helper_files[i].substr(0, helper_files[i].lastIndexOf('.'));  //remove ".js" from file name
			helpers[helper_name] = helper_instance;
		};

		return helpers;
	}


	//initialize factory
	CORE.factories = {};

	var factories_files = fs.readdirSync( _config.directories.factories );

	for( i = 0; i < factories_files.length; i++ ) {

		var factory_function = require(  _config.root_path_relateive_to_core +  _config.directories.factories + "/" + factories_files[i] )(CORE);

		var factory_name = factories_files[i].substr(0, factories_files[i].lastIndexOf('.')); //remove ".js" from file name

		CORE.factories[factory_name] = factory_function;
	}








	CORE.interfaces = {};

	var interface_directories = fs.readdirSync( _config.directories.interfaces );

	for( i = 0; i < interface_directories.length; i++ ){

		var interface_name = interface_directories[i];

		var interface_instance = require( _config.root_path_relateive_to_core + _config.directories.interfaces + "/" + interface_directories[i] + "/interface.js"  )(CORE);
		interface_instance.setName(interface_name);

		CORE.interfaces[ interface_name ] = interface_instance;
	}






	CORE.middlewares = {};

	var middleware_directories = fs.readdirSync( _config.directories.middlewares );

	for( i = 0; i < middleware_directories.length; i++ ){

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



	CORE.helpers = _getHelpers();
	//CORE.factories = _getFactories()




	return CORE;
})();
