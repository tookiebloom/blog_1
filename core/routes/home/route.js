module.exports = [
	{
		method: 'GET',
		path: '/',
		handler :  function (req, res) {

			var _interface = req.interface_ctrl.get_interface('homepage');

			//var data = req.model.get_homepage_data();

			res.send( _interface.homepage('homepage', data)  );
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
