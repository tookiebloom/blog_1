const Events = require('events');
var assign = require('object-assign');
var AppDispatcher = require('../dispatcher/AppDispatcher');

var Actions = require('../constants/Actions.js');
var BlogApi = require('../api/BlogApi.js');

var _event_bus = new Events.EventEmitter();



var BlogStore = function(){


	var	_posts, _media, _prio_tags, _tag_color_map, _settings, _post, _validation_message, _auth, _err_object;

	var _init = function(){
		//do init
		pageData 				= pageData || {};

		_posts 					= pageData.posts || [];
		_settings 				= pageData.settings || {};

		_settings.tag_prio 		= _settings.tag_prio || "";
		_settings.tag_colors 	= _settings.tag_colors || "";

		_post 					= pageData.post || {};
		_auth 					= pageData.auth || {};
		_err_object 			= pageData.err_object || "";

		_validation_message 	= pageData.validation_message || "";

		pageData.media 								&& _pushMediaArray(pageData.media);
		_initTags();
		_initTagColorMap();



	};

	var _pushMediaArray = function(media){
		// map all the media files into media.id, for ease of extraction
		_media = (media || []).reduce(function(acc, crt){
			acc[ crt._id ] = crt;
			return acc;
		},_media || {}); 
	};



	var _initTags = function(){



		_prio_tags = _settings.tag_prio.split("<|>")
		.reduce(function(acc, crt){
			var components = crt.split("~");

			if (pageData.tags && pageData.tags.indexOf(components[0]) != -1 && parseInt(components[1]) > 0 ){
				acc.push({
					name: components[0],
					prio: parseInt(components[1])
				});
			}

			return acc;
		},[])
		.sort(function(a,b){
			if(a.prio < b.prio){
				return -1;
			} else if(a.prio > b.prio) {
				return 1;
			}
			return 0;
		});

	};

	var _initTagColorMap = function(){
		_tag_color_map = _settings.tag_colors.split("<|>").reduce(function(acc, crt){
			var components = crt.split("~");
			acc[components[0]] = (components[1] || '');
			return acc;
		},{});
	}


	var _getHomeContext = function(){
		return {
			media 			: _media,
			tag_color_map 	: _tag_color_map,
			texts : {
				home : {
					tagline : _settings.homepage_tagline
				}
			}
		};
	};


	var _getPostContext = function(){
		return {
			media 			: _media,
			tag_color_map 	: _tag_color_map,
			texts : {
				post : {

				}
			}
		};
	};


	var _getLoginContext = function(){
		return {
			validation_message : _validation_message
		};
	};

	var _getPosts = function(){
		return _posts;
	};

	var _getPost = function(){
		return _post;
	}

	var _getTags = function(){
		return _prio_tags;
	};

	var _addActionCompletedListener = function(callback){
    	_event_bus.on(Actions.BLOG.ACTION_COMPLETED, callback);
	};

	var _removeActionCompletedListener = function(callback){
    	_event_bus.removeListener(Actions.BLOG.ACTION_COMPLETED, callback);
	};

	var _getAuth = function(){
		return _auth;
	};

	var _getErrorContext = function(){
		return {
			err_object : _err_object
		};
	};

	_event_bus.on(Actions.SERVER.MORE_POSTS_PROVIDED, function(response){

		if( response.status == "success" ) {
			_posts = _posts.concat(response.posts);
			_pushMediaArray(response.media);
		}
		_event_bus.emit(Actions.BLOG.ACTION_COMPLETED,Actions.BLOG.MORE_POSTS_REQUESTED, response);
	});




	_event_bus.on(Actions.SERVER.NEW_COMMENT_ADDED, function(response){

		if( response.status == "success" ) {
			_post.comments.push({
				id 	 : response.commentComponents.id,
				name : response.commentComponents.name,
				body : response.commentComponents.body,
				answer_to : response.commentComponents.answer_to,
				timestamp : response.commentComponents.timestamp
			});
		}
		_event_bus.emit(Actions.BLOG.ACTION_COMPLETED,Actions.BLOG.COMMENT_SUBMITTED, response);
	});


	_event_bus.on(Actions.SERVER.MESSAGE_SENT, function(response){
		_event_bus.emit(Actions.BLOG.ACTION_COMPLETED,Actions.BLOG.MESSAGE_SUBMITTED, response);
	});

	_init();

	return {
		getPosts 						: _getPosts,
		getTags 						: _getTags,
		addActionCompletedListener 		: _addActionCompletedListener,
		removeActionCompletedListener 	: _removeActionCompletedListener,
		getPost							: _getPost,
		getAuth 						: _getAuth,

		getHomeContext					: _getHomeContext,
		getPostContext					: _getPostContext,
		getLoginContext 				: _getLoginContext,
		getErrorContext 				: _getErrorContext
	};



};


AppDispatcher.register(function(action) {

	switch(action.actionType) {

		case Actions.BLOG.MORE_POSTS_REQUESTED:

			BlogApi.getPostsPage(action.pageIndex)
			.then(function(response){
				_event_bus.emit(Actions.SERVER.MORE_POSTS_PROVIDED, response );

			}, function(err) {
				console.log('api failed for action', action, err);
				_event_bus.emit(Actions.SERVER.MORE_POSTS_PROVIDED, {
					status: "error",
					message: err.message
				});
			});
		break;

		case Actions.BLOG.COMMENT_SUBMITTED:
			BlogApi.submitComment(action.postId, action.commentComponents )
			.then(function(response){
				_event_bus.emit(Actions.SERVER.NEW_COMMENT_ADDED, response );
			}, function(err) {
				console.log('%c Event emit failed state ', 'background: #222; color: #f00');
				_event_bus.emit(Actions.SERVER.NEW_COMMENT_ADDED, {
					status: "error",
					message: err.message
				});
			});

		break;

		case Actions.BLOG.MESSAGE_SUBMITTED: 
			BlogApi.submitMessage(action.messageComponents )
			.then(function(response){
				_event_bus.emit(Actions.SERVER.MESSAGE_SENT, response );
			}, function(err) {
				console.log('%c Event emit failed state ', 'background: #222; color: #f00');
				_event_bus.emit(Actions.SERVER.MESSAGE_SENT, {
					status: "error",
					message: err.message
				});
			});


		default:
		// no op
	}

});


module.exports = BlogStore;
