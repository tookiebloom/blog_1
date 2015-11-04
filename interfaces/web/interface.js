
module.exports = function(CORE, interface_name){

	var web_intf = CORE.factories.interface();


	var doT = require("dot");


	web_intf.dots = doT.process({path: "./interfaces/web/views"});
	web_intf.fragments = doT.process({path: "./interfaces/web/views/fragments"});


	web_intf.view('homepage', function(data){

		return web_intf.dots.homepage({
			header: web_intf.fragments.header({}),
			footer: web_intf.fragments.footer({}),
			name: "Beni"
		});
	});


	web_intf.view('contact', function(data){
		return "this is the contact page";
	});

	return web_intf;
};
