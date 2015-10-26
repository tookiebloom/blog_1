
var fs = require('fs');
var CORE = require('../../core.js');

//TODO: read interfaces folder
//add the "assemble interface function"









var InterfaceController = function(){


	var interface_folders = fs.readdirSync( CORE.path.directories.interfaces );



	var interfaces = {};

	//interfaces.web
	//interfaces.admin

	for( var i = 0; i < interface_folders.length; i++ ){

		//TODO FIX THE UGLY RELATIVE PATH !!!1!!(one)!!
		var crt_interface = require( "../../../interfaces/" + interface_folders[i] + "/interface.js"  );

		if( typeof  crt_interface === "function" ){
			interfaces[ interface_folders[i] ] = crt_interface();
		}

	}

	var _get_interface = function(req, res){

		//todo if interface is log, return log, if interface is json, return the json, etc etc etc
		return interfaces.web;

	}


	return {
		get_interface : _get_interface
	}

};

var i_ctrl = InterfaceController();


module.exports = function (req, res, next) {

	req.interface_ctrl = i_ctrl;

	next();
}
