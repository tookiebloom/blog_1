module.exports = [
	{
		method: 'GET',
		path: '/',
		handler :  function (req, res) {

			res.send( req.interface.render('homepage')  );

		}
	},
	{
		method: 'POST',
		path: '/',
		handler : function(req, res) {






			req.model.addPost(req)
				.then(function(data){

					res.send( JSON.stringify(data) );

				}).catch(function(){
					res.send("someething happened;");
				});

		}
	}
];
