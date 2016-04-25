/**
	To create a view with DoT.js:

	Values that are marked like <this> need to be replaced with appropriate values.


	admin_intf.view('<view name>', function(data){

			//DO any computation on the data, if necessary (most likely not necessary)


		return admin_intf.dots.<view file>({
			fragments: admin_intf.fragments, //this variable is accesible inside the view file using "it.fragments" and it's used to insert the header and the footer in the view
			<view param> : data.<view param> //this will be accesible inside the view using it.<view param>
		});
	});


*/


module.exports = function(CORE, interface_name){

	var admin_intf = CORE.factories.interface();


	var doT = require("dot");


	admin_intf.dots = doT.process({path: "./client/interfaces/admin/views"});
	admin_intf.fragments = doT.process({path: "./client/interfaces/admin/views/fragments"});





	/*
		The main Admin Page.
	*/
	admin_intf.view('admin_panel', function(data){

		return admin_intf.dots.main_panel({
			fragments: admin_intf.fragments,
			notifications: data.notifications
		});
	});


	admin_intf.view('settings', function(data){

		var tag_color_map = data.settings.tag_colors.split('<|>').reduce(function(acc, crt){
			var components = crt.split("~");
			acc[components[0]] = components[1] || '';
			return acc;
		},{})

		var tag_prio_map = data.settings.tag_prio.split('<|>').reduce(function(acc, crt){
			var components = crt.split("~");
			acc[components[0]] = components[1] || '';
			return acc;
		}, {});

		return admin_intf.dots.settings({
			fragments		: admin_intf.fragments,
			notifications	: data.notifications,
			settings		: data.settings,
			tags			: data.tags,
			tag_color_map 	: tag_color_map,
			tag_prio_map	: tag_prio_map
		});
	});



	/*
		The post list page.
	*/
	admin_intf.view('posts', function(data){
		return admin_intf.dots.posts({
			fragments: admin_intf.fragments,
			posts: data.posts
		});
	});



	/*
		The new post page.
	*/
	admin_intf.view('new_post', function(data){
		return admin_intf.dots.post({
			fragments: admin_intf.fragments,
			tags: data.tags
		});
	});


	/*
		Edit post page
	*/

	admin_intf.view('media', function(media_files){

		return admin_intf.dots.media({
			fragments		: admin_intf.fragments,
			media_files		: media_files
		});
	});





	/*
		Edit post page
	*/

	admin_intf.view('edit_post', function(data){

		return admin_intf.dots.post({
				fragments	: admin_intf.fragments,
				post		: data.post,
				tags		: data.tags
			});
	});



	admin_intf.view('upload_report', function(file_arrays){

		return admin_intf.fragments.upload_file({
			valid_files: file_arrays.valid,
			invalid_files: file_arrays.invalid
		});

	});


	admin_intf.view('user', function(data){

		return  admin_intf.dots.user({
			fragments	: admin_intf.fragments,
			user		: data.user
		});

	});


	return admin_intf;
};
