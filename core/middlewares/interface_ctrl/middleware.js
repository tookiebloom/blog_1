//INTERFACE CONTROLLER
module.exports = function(CORE){

	//TODO: find a way not to execute this function on EACH request
	var _extendInterfaceObject = function(int_obj, interface_name){

		int_obj.__interface_name = interface_name;

		int_obj.is = function(name){
			return int_obj.__interface_name === name;
		}

		return int_obj;
	};


	var _getInterface = function(interface_name){

		interface_name = typeof interface_name === "string" ? interface_name : CORE.config.default_interface;

		if( typeof CORE.interfaces[interface_name] !== "object" ) {
			throw new Error("The interface you requested was not found. Please make sure you either specify an defined interface, or you have specified a default interface in the config file.");
		}

		return _extendInterfaceObject( CORE.interfaces[interface_name], interface_name );
	}



	return  function (req, res, next) {

		req.interface = _getInterface( req.query.interface );

		next();
	};
};
