
module.exports = function(CORE, interface_name){

	var admin_intf = CORE.factories.interface();


	var doT = require("dot");


	admin_intf.dots = doT.process({path: "./interfaces/admin/views"});
	admin_intf.fragments = doT.process({path: "./interfaces/admin/views/fragments"});


	admin_intf.view('homepage', function(data){

		return admin_intf.dots.homepage({
			header: admin_intf.fragments.header({}),
			footer: admin_intf.fragments.footer({}),
			name: "Beni"
		});
	});


	return admin_intf;
};
