module.exports = function(CORE){


	return function (req, res, next) {

		req.model = "aici ne definim modelul";

		next();
	};
};
