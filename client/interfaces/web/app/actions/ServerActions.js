var AppDispatcher = require('../dispatcher/AppDispatcher.js');


var ServerActions = {


	doAction: function(text) {

		AppDispatcher.dispatch({
		  actionType: "SOME_ACTION_TYPE",
		  text: text
		});
	}
}

module.exports = ServerActions;
