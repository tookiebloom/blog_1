var AppDispatcher = require('../dispatcher/AppDispatcher.js');


var BlogActions = {


	doAction: function(text) {

		AppDispatcher.dispatch({
		  actionType: "SOME_ACTION_TYPE",
		  text: text
		});
	},


}




module.exports = BlogActions;
