
var sanitizeHtml = require('sanitize-html');




module.exports = function(_config){

	var _cleanCommentSubmit = function(commentComponents){

		return {
			post_id  	: commentComponents.post_id,
			name	 	: sanitizeHtml(commentComponents.name),
			body	 	: sanitizeHtml(commentComponents.body),
			answer_to 	: commentComponents.answer_to,
			timestamp	: commentComponents.timestamp
		};
	};



	return {
			cleanCommentSubmit : _cleanCommentSubmit
	};
};
