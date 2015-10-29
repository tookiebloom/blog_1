//INTERFACE CONTROLLER
module.exports = function(CORE){

	var _get_interface = function(interface_name){

		interface_name = typeof interface_name === "string" ? interface_name : CORE.config.default_interface;

		if( typeof CORE.interfaces[interface_name] !== "object" ) {
			throw new Error("The interface you requested was not found. Please make sure you either specify an defined interface, or you have specified a default interface in the config file.");
		}

		return CORE.interfaces[interface_name];
	}



	return  function (req, res, next) {

		req.interface = _get_interface( req.query.interface );

		next();
	};
};
