var express = require('express');

var CORE = require('./core.js');
var Router = require('./router.js');


//log: CORE.import.middleware('log');
var middlewares = {
	log: require('./middlewares/log/log.js'),
	auth: require('./middlewares/auth/auth.js'),
	model: require('./middlewares/model/model.js'),
	interface_ctrl: require('./middlewares/interface_ctrl/interface_ctrl.js')
};




//the value of "module.exports" is returned by the require function
module.exports = function(){
	var _core = {};


	_core.init = function(){


		_core.app = express();
		_core.app.use(middlewares.log);
		_core.app.use(middlewares.auth);
		_core.app.use(middlewares.model);
		_core.app.use(middlewares.interface_ctrl);


		//init static files
		_core.app.use("/res",express.static( './res' ));

		_core.router = Router( _core.app );

		_core.router.init();








		//TODO: find a clever way to do routes
		_core.app.get('/', function (req, res) {

			var response = req.log + "<br>";
			response += req.auth + "<br>";
			response += req.model + "<br>";
			response += req.interface_ctrl + "<br>";
			res.send(response);
		});


		var server = _core.app.listen(CORE.config.port, function () {
		  var host = server.address().address;
		  var port = server.address().port;

		  console.log('Example app listening at http://%s:%s', host, port);
		});

	};


	return _core;
};
