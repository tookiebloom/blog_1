module.exports = function (req, res, next) {

	req.kernel = "kernelul a lucrat ceva aici";

	next();
}
