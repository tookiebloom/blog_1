
module.exports = function(CORE){




	var web_intf = CORE.factories.interface();



	/*web_intf.init = function(){



		var dots = require("dot").process({path: "./interfaces/web/views"});



		//aici trebuie initializata interfata
	}*/


	web_intf.homepage = function(){

		return "stuff";
	}



	return web_intf;



};
