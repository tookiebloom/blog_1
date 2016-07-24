var http = require('http');
var Promise = require('bluebird');
var ApiConstants = require('../constants/Api.js');
var querystring = require('querystring');


var  byteLength = function(str) {
	// returns the byte length of an utf8 string
	var s = str.length;
	for (var i=str.length-1; i>=0; i--) {
		var code = str.charCodeAt(i);
		if (code > 0x7f && code <= 0x7ff) s++;
		else if (code > 0x7ff && code <= 0xffff) s+=2;
		if (code >= 0xDC00 && code <= 0xDFFF) i--; //trail surrogate
	}
	return s;
}

var getTagParam = function(){
	return window.location.pathname.indexOf('/t/') != -1 ?  
		"&tag=" + window.location.pathname.substr(3) : "";
};


module.exports = {

	getPostsPage : function(pageIndex) {
		return new Promise(function(resolve, reject){

			http.get({
				path : ApiConstants.PATH_TEMPLATES.GET_BLOG_PAGE.replace('<~page_index~>',pageIndex).replace('<~tag_param~>', getTagParam())
			}, function (res) {
			    var _buff = "";
			    res.on('data', function (buff) { _buff += buff;  });
			    res.on('end', function () {
					try {
						resolve(JSON.parse(_buff));
					} catch(e) {
						reject(new Error("parsing for the json when requesting the page with the index " + pageIndex + " failed"));
					}
			    });
			}).on('error', function(e){
				reject(new Error("request failed when trying to get page "+ pageIndex));
			});
		});

	},

	submitComment : function(postId, commentComponents) {

		var post_data = querystring.stringify({
			post_id 	: postId,
			name		: commentComponents.name,
			body		: commentComponents.body,
			answer_to	: commentComponents.answer_to,
			timestamp	: commentComponents.timestamp
		});

		return new Promise(function(resolve, reject) {

			var _post = http.request({
				path : ApiConstants.PATH_TEMPLATES.SUBMIT_COMMENT,
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'Content-Length': byteLength(post_data)
				}
			}, function (res) {

				var _buff = "";
				res.on('data', function (buff) {
					_buff += buff;
				});
				res.on('end', function () {
					try {
						resolve(JSON.parse(_buff));
					} catch(e) {
						reject(new Error("parsing for the json when submitting comment failed."));
					}
				});
			}).on('error', function(e){
				reject(new Error("request failed when trying to submit comment "));
			});

			_post.write(post_data);
			_post.end();
		});
	},

	submitMessage : function( messageComponents) {

		var post_data = querystring.stringify({
			name		: messageComponents.name,
			body		: messageComponents.body,
			email		: messageComponents.email,
			timestamp	: messageComponents.timestamp
		});

		return new Promise(function(resolve, reject) {

			var _post = http.request({
				path : ApiConstants.PATH_TEMPLATES.SUBMIT_MESSAGE,
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'Content-Length': byteLength(post_data)
				}
			}, function (res) {

				var _buff = "";
				res.on('data', function (buff) {
					_buff += buff;
				});
				res.on('end', function () {
					try {
						resolve(JSON.parse(_buff));
					} catch(e) {
						reject(new Error("parsing for the json when submitting comment failed."));
					}
				});
			}).on('error', function(e){
				reject(new Error("request failed when trying to submit comment "));
			});

			_post.write(post_data);
			_post.end();
		});
	}


};
