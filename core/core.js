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




var _getFactories=function(){

var factories_files = fs.readdirSync( _config.directories.factories ),
	factories={},
	factory_function,i,factory_name;

	for( i = 0; i < factories_files.length; i++ ) {

	 factory_function = require(  _config.root_path_relateive_to_core +  _config.directories.factories + "/" + factories_files[i] )(CORE);

	 factory_name = factories_files[i].substr(0, factories_files[i].lastIndexOf('.')); //remove ".js" from file name

	factories[factory_name] = factory_function;
};
return factories;

}



var _getInterfaces=function(){
	
	var interface_directories = fs.readdirSync( _config.directories.interfaces ),
	interfaces = {},
	interface_name,interface_instance,i;

	for( i = 0; i < interface_directories.length; i++ ){

	 interface_name = interface_directories[i];

		 interface_instance = require( _config.root_path_relateive_to_core + _config.directories.interfaces + "/" + interface_directories[i] + "/interface.js"  )(CORE);
		interface_instance.setName(interface_name);

	interfaces[ interface_name ] = interface_instance;
};
return interfaces;
}




var _getMiddlewares=function(){

	var middleware_directories = fs.readdirSync( _config.directories.middlewares ),
	middlewares = {},
	middleware_function,middleware_name,i;

	for( i = 0; i < middleware_directories.length; i++ ){

		 middleware_function = require(  _config.root_path_relateive_to_core  + _config.directories.middlewares + "/" + middleware_directories[i] + "/middleware.js"  )(CORE);

		 middleware_name = middleware_directories[i];
		middlewares[middleware_name] = middleware_function;
	};
	return middlewares;

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
	CORE.factories=_getFactories();
	CORE.interfaces=_getInterfaces();
	CORE.middlewares=_getMiddlewares();






	return CORE;
})();
