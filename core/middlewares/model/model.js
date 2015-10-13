module.exports = function (req, res, next) {

	req.model = "aici ne definim modelul";

	next();
}
