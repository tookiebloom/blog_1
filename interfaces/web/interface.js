
module.exports = function(CORE){

	var web_intf = CORE.factories.interface();


	web_intf.view('homepage', function(data){
		return "this is the rendered homepage";
	});


	web_intf.view('contact', function(data){
		return "this is the contact page";
	});

	return web_intf;
};
