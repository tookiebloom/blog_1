module.exports = function(CORE){

	var repo = CORE.repos.mongodb;


	var _addPost = function(req){

		return repo.insert({
			headline	: req.body.headline,
			permalink	: req.body.permalink,
			body		: req.body.body,
			tags		: CORE.helpers.utils.splitAndTrim(req.body.tags, ","),
			created		: Date.now(),
			comments	: []
		}, "posts");
	};



	var _getPosts = function(){

		return repo.find({}, "posts");
	};




	return function (req, res, next) {

		req.model = {
			addPost : _addPost,
			getPosts: _getPosts
		}

		next();
	};
};
