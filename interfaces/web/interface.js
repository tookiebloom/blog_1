
module.exports = function(){

	var dots = require("dot").process({path: "./interfaces/web/views"});



	return {

		homepage : function(){
			return dots.index();
		}
	};

};
