var express = require('express');


module.exports = function(config){
	var _chs = this;
	
	/**
	 *  initializes the chassis server 
	 */
	_chs.init = function(){
			
		//init express app	
		_chs.app = express();
		
		
		//init template
		_chs.dots = require("dot").process({path: "./core/views"});
		
		//init router
		_chs.router = require('./bin/router/router.js')(_chs);
		_chs.router.setRoutes();
		
		//init static files
		_chs.app.use("/res",express.static( './res' ));

		//start the server
		_chs.server = _chs.app.listen( config.port , function(){
			console.log('am pornit serverul pe portul: ' , config.port)
		});
		
	};
	
	return _chs;
};

