var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var multer  = require('multer');



//the value of "module.exports" is returned by the require function
module.exports = function(config){
	var _ctrl = {};

	var CORE = require('./core.js')(config);


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


		// default middlewares

		//SET THE ASYNC FILE UPLADER MIDDLEWARE
		_ctrl.app.use( multer({ dest:  config.root_path_relateive_to_core + 'client/res/uploads/tmp'}).array('filesToUpload', 15) );

		_ctrl.app.use( bodyParser.json() );       // to support JSON-encoded bodies
		_ctrl.app.use( bodyParser.urlencoded({     // to support URL-encoded bodies
		  extended: true
		}));
		_ctrl.app.use(cookieParser());

		//we manually set each middleware because the order is very important
		//attach helpers to

		_ctrl.app.use(CORE.middlewares.helpers);
		_ctrl.app.use(CORE.middlewares.model);
		_ctrl.app.use(CORE.middlewares.auth);
		_ctrl.app.use(CORE.middlewares.media);
		_ctrl.app.use(CORE.middlewares.interface_ctrl);



		//init static files
		_ctrl.app.use("/res",express.static('./client/res/' ));


		//initialize router
		CORE.router(_ctrl.app);




		var server = _ctrl.app.listen( CORE.config.port, function () {
		  var host = server.address().address;
		  var port = server.address().port;

		  console.log('Example app listening at http://%s:%s', host, port);
		});

	};


	return _ctrl;
};
