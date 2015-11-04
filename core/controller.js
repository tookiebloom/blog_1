var express = require('express');
var bodyParser = require('body-parser')

var CORE = require('./core.js');




//the value of "module.exports" is returned by the require function
module.exports = function(){
	var _ctrl = {};


	var _processEvents = function(){

		process.stdin.resume();//so the program will not close instantly

		function exitHandler(options, err) {

			if (options.cleanup ){
				CORE.cleanup();
			}

			if (err) console.log(err.stack);

			if (options.exit) process.exit();
		}

		//do something when app is closing
		process.on('exit', exitHandler.bind(null,{cleanup:true}));

		//catches ctrl+c event
		process.on('SIGINT', exitHandler.bind(null, {exit:true}));

		//catches uncaught exceptions
		process.on('uncaughtException', exitHandler.bind(null, {exit:true}));
	};


	_ctrl.init = function(){

		_processEvents();

		_ctrl.app = express();
		_ctrl.app.use(CORE.middlewares.log);
		_ctrl.app.use(CORE.middlewares.auth);
		_ctrl.app.use(CORE.middlewares.model);
		_ctrl.app.use(CORE.middlewares.interface_ctrl);

		_ctrl.app.use( bodyParser.json() );       // to support JSON-encoded bodies
		_ctrl.app.use( bodyParser.urlencoded({     // to support URL-encoded bodies
		  extended: true
		}));


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
