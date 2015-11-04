module.exports = function(CORE){

	var repo = CORE.repos.mongodb;

	var _addPost = function(req){

		return repo.insert(body, "posts");

	};




	return function (req, res, next) {

		req.model = {
			addPost : _addPost
		}

		next();
	};
};
