var config = {
	port: 2111	
};

var chassis = require('./core/chassis.js')( config );

chassis.init();