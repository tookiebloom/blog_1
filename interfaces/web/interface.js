
module.exports = function(CORE, interface_name){

	var web_intf = CORE.factories.interface();


	var doT = require("dot");


	web_intf.dots = doT.process({path: "./interfaces/web/views"});
	web_intf.fragments = doT.process({path: "./interfaces/web/views/fragments"});


	web_intf.view('homepage', function(data){

		return web_intf.dots.homepage({
			header: web_intf.fragments.header({
				user_token : data.user_token
			}),
			footer: web_intf.fragments.footer({}),
			name: "Beni"
		});
	});


	web_intf.view('contact', function(data){
		return "this is the contact page";
	});


	web_intf.view('login', function(data){

		console.log('login interface data:', data);

		return web_intf.dots.login({
			header: web_intf.fragments.header({}),
			footer: web_intf.fragments.footer({}),
			validation_message: data?  data.validation_message: ''
		});
	});


	return web_intf;
};
