module.exports = [
	{
		method: 'GET',
		path: '/contact/',
		handler :  function (req, res) {


			res.send(  req.interface.render('contact') );
		}
	}
];
