module.exports = [
	{
		method: 'GET',
		path: '/',
		handler :  function (req, res) {


			if( req.interface.is('admin') ){
				res.send(  req.interface.render('admin_panel') )
			} else {

				res.send( req.interface.render('homepage') );

			}


		}
	},
	{
		method: 'POST',
		path: '/',
		handler : function(req, res) {



		}
	}
];
