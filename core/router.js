var fs = require('fs');
var CORE = require('./core.js');

module.exports = function (_app) {



	var _init = function(){


		var route_directories = fs.readdirSync( CORE.path.directories.routes );

		for(var i = 0; i < route_directories.length; i++ ){

			var _crt_dir = route_directories[i];


			//TODO fix the path consistency
			var routes_arr = require(  "./routes/" + _crt_dir  + "/route.js" );



			for( var j = 0; j < routes_arr.length; j++ ){

				var _method 	= routes_arr[j].method.toLowerCase();;
				var _path 		= routes_arr[j].path;
				var _handler 	= routes_arr[j].handler;
				_app[ _method ]( _path, _handler );
			}
		}
	};





	return {
		init: _init
	};
};
