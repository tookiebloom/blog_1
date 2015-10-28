//INTERFACE CONTROLLER
module.exports = function(CORE){

	var _interfaces = CORE.getInterfaces();

	var _get_interface = function(){


		return _interfaces.web;

	}




	return  function (req, res, next) {

		req.interface_ctrl = {


			get_interface : _get_interface

		};

		next();
	};
};
