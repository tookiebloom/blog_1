 ObjectID = require('mongodb').ObjectID,

module.exports = function(CORE){

	var repo = CORE.repos.mongodb;


	var _addPost = function(req){

		return repo.insert("posts", {
			headline	: req.body.headline,
			permalink	: req.body.permalink,
			body		: req.body.body,
			tags		: CORE.helpers.utils.splitAndTrim(req.body.tags, ","),
			created		: Date.now(),
			comments	: []
		});
	};



	var _getPosts = function(){
		return repo.find("posts", {});
	};


	var _deletePost = function(post_id){
		return repo.delete("posts", {_id: ObjectID(post_id) });
	};



	var _getPost = function(post_id) {
		return repo.find("posts",{_id: ObjectID(post_id)});
	}

	var _editPost = function(req, post_id){

		return repo.edit("posts", {_id: ObjectID(post_id)}, {
			headline	: req.body.headline,
			permalink	: req.body.permalink,
			body		: req.body.body,
			tags		: CORE.helpers.utils.splitAndTrim(req.body.tags, ","),
			created		: Date.now(),
			comments	: []
		});

	};



	return function (req, res, next) {

		req.model = {
			addPost 	: _addPost,
			getPosts	: _getPosts,
			deletePost	: _deletePost,
			getPost		: _getPost,
			editPost	: _editPost
		}

		next();
	};
};
