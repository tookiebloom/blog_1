var http = require('http');
var Promise = require('bluebird');

module.exports = {

	getPostsPage : function(pageIndex) {
		return new Promise(function(resolve, reject){

			http.get({ path : '/system/get_blog_page?pageIndex=0&useinterface=json' }, function (res) {
			    var _buff = "";

			    res.on('data', function (buff) {
					_buff += buff;
			    });

			    res.on('end', function () {
					try {
						resolve(JSON.parse(_buff));
					} catch(e) {
						reject({
							status: "error",
							message: "parsing for the json when requesting the page with the index " + pageIndex + " failed"
						});
					}
			    });
			}).on('error', function(e){
				reject({
					status: "error",
					message: "request failed when trying to get page "+ pageIndex
				});
			});


		});

	}

};
