module.exports = [
	{
		method: 'GET',
		path: '/',
		handler :  function (req, res) {

			var _interface = req.interface_ctrl.get_interface('homepage');

			res.send( _interface.homepage()  );
		}
	},
	{
		method: 'POST',
		path: '/',
		handler :  function (req, res) {

			res.render('index', { title: 'Hey', message: 'Hello there!'});
		}
	}
];
