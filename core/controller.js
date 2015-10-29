var express = require('express');

var CORE = require('./core.js');




//the value of "module.exports" is returned by the require function
module.exports = function(){
	var _ctrl = {};


	_ctrl.init = function(){


		_ctrl.app = express();
		_ctrl.app.use(CORE.middlewares.log);
		_ctrl.app.use(CORE.middlewares.auth);
		_ctrl.app.use(CORE.middlewares.model);
		_ctrl.app.use(CORE.middlewares.interface_ctrl);


		//init static files
		_ctrl.app.use("/res",express.static( './res' ));

		CORE.router(_ctrl.app);




		var server = _ctrl.app.listen( CORE.config.port, function () {
		  var host = server.address().address;
		  var port = server.address().port;

		  console.log('Example app listening at http://%s:%s', host, port);
		});

	};


	return _ctrl;
};
