var keyMirror = require('key-mirror');

module.exports = {
	BLOG: keyMirror({
		MORE_POSTS_REQUESTED : null,
		ACTION_COMPLETED : null,
		COMMENT_SUBMITTED : null,
		ANSWER_INDEX_SELECTED : null,
		MESSAGE_SUBMITTED : null
	}),

	SERVER: keyMirror({
		MORE_POSTS_PROVIDED : null,
		NEW_COMMENT_ADDED : null,
		MESSAGE_SENT	: null
	})
};
