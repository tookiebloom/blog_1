var express = require('express');

var config  = require('./config/config.js');

var middlewares = {
	log: require('./bin/log/log.js'),
	auth: require('./bin/auth/auth.js'),
	kernel: require('./bin/kernel/kernel.js'),
	interface: require('./bin/interface/interface.js')
};


module.exports = function(){
	var _core = this;


	_core.init = function(){


		_core.app = express();

		_core.app.use(middlewares.log);

		_core.app.use(middlewares.auth);

		_core.app.use(middlewares.kernel);

		_core.app.use(middlewares.interface);

		//TODO: find a clever way to do routes
		_core.app.get('/', function (req, res) {

			var response = req.log + "\n";
			response += req.auth + "\n";
			response += req.kernel + "\n";
			response += req.interface + "\n";


			res.send(response);
		});


		var server = _core.app.listen(config.port, function () {
		  var host = server.address().address;
		  var port = server.address().port;

		  console.log('Example app listening at http://%s:%s', host, port);
		});

	};
};
