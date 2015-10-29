module.exports = [
	{
		method: 'GET',
		path: '/',
		handler :  function (req, res) {



			res.send(  req.interface.render('homepage') );
		}
	}
];
