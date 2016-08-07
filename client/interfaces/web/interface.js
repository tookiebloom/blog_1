
module.exports = function(CORE, interface_name){

	var web_intf = CORE.factories.interface();


	var doT = require("dot");
	web_intf.dots = doT.process({path: "./client/interfaces/web/views"});

	web_intf.view('homepage', function(data){

		return web_intf.dots.react_base({
			pageData : data
		});
	});


	web_intf.view('contact', function(data){

		return web_intf.dots.react_base({});

	});


	web_intf.view('login', function(data){
		return web_intf.dots.react_base({
			pageData: data
		});
	});



	web_intf.view('post', function(data){

		return web_intf.dots.react_base({
			pageData : data
		});
	});

	web_intf.view('404', function(data){
		return web_intf.dots.react_base({
			pageData : {
				err_object: {
					err_message : "Error 404: Page not found :("
				}
			}
		});
	});

	web_intf.view('403', function(data){
		return web_intf.dots.react_base({
			pageData : {
				err_object: {
					err_message : "Error 403: Access is forbidden ;) "
				}
			}
		});
	});


	web_intf.view('500', function(data){
		return web_intf.dots.react_base({
			pageData : {
				err_object: {
					err_message : "Error 500: Internal server error x_x. Please help me by sending me the error report:",
					err_report : JSON.stringify(data.err_object, null, 4)
				}
			}
		});
	});

	return web_intf;
};
