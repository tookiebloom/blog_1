//PATH HELPER
module.exports = function(_config){

	var _validateCommentSubmit = function(commentComponents){
		var errs = [];

		if(typeof commentComponents.post_id !== "string"){
			errs.push("The post id is not valid.");
		}

		if( typeof commentComponents.name !== "string" || commentComponents.name.length < 3 ) {
			errs.push("The name is not provided or it's too short");
		}

		if( typeof commentComponents.body !== 'string' || commentComponents.body.length < 5 ) {
			errs.push("The comment body is way too short");
		}

		if( isNaN(commentComponents.answer_to) ) {
			errs.push('The <answer to> field is not a number');
		}

		if( isNaN(commentComponents.timestamp) ) {
			errs.push('The timestamp component is not a number');
		}

		return errs;
	};



	return {
			validateCommentSubmit : _validateCommentSubmit
	};
};
