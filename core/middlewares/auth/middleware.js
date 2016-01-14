var Promise = require('bluebird');
var jwt = require('jwt-simple');


module.exports = function(CORE){


	var repo = CORE.repos.mongodb;

	//todo: LOGIN, logout,

	var _validateLogin =  function (email, password){
		return new Promise(function(resolve, reject){
			console.log('trying to validate for', email, password);

			repo.find('users', {email: email, password: password})
			.done(function(find_result){

				if( find_result.length == 0 ){
					resolve({
						valid: false
					});
				} else {
					resolve({
						valid: true,
						user: find_result.shift()
					});
				}
			});

		});
	};

	var _getDefaultLoginJWT = function(user){
		return jwt.encode({
			email: user.email
		},  CORE.config.secrets.jwt );
	};



	return function (req, res, next) {


	   req.auth = {
		   validateLogin : _validateLogin,
		   getDefaultLoginJWT : _getDefaultLoginJWT
	   };



	   next();
   };

};
