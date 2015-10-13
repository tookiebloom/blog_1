module.exports = function (req, res, next) {


	req.auth = "Userul s-a autentificat !!! yey";



	next();
};
