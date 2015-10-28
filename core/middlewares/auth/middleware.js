module.exports = function(CORE){




	return function (req, res, next) {


	   req.auth = "Userul s-a autentificat !!! yey";



	   next();
   };

};
