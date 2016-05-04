var keyMirror = require('key-mirror');

module.exports = {
	BLOG: keyMirror({
		MORE_POSTS_REQUESTED : null,
		ACTION_COMPLETED : null
	}),

	SERVER: keyMirror({
		MORE_POSTS_PROVIDED: null
	})
};
