var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var Actions = require('../constants/Actions.js');

var BlogActions = {


	requestMorePosts : function(pageIndex) {
		AppDispatcher.dispatch({
			actionType: Actions.BLOG.MORE_POSTS_REQUESTED,
			pageIndex: pageIndex
		});
	}
}

module.exports = BlogActions;
