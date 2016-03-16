module.exports = function(CORE){




	return function (req, res, next) {



		req.log = "usserul a logat ceva chestie";



		next();
	};
};
