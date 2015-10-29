
module.exports = function(CORE){



	var admin_intf = CORE.factories.interface();


	admin_intf.view('homepage', function(data){

		return "this is the rendered admin";
	});


	return admin_intf;



};
