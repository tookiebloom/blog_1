const Events = require('events');
var assign = require('object-assign');
var AppDispatcher = require('../dispatcher/AppDispatcher');



var BlogStore = function(){

	var _event_bus = assign({},Events.eventEmitter),
		_posts, _media, _prio_tags, _tag_color_map, _settings ;

	var _init = function(){
		//do init
		pageData = pageData || {};

		_posts 		= pageData.posts || [];
		_settings 	= pageData.settings || {};

		pageData.media 			&& _initMedia();
		_settings.tag_prio 		&& _initTags();
		_settings.tag_colors 	&& _initTagColorMap();
	};

	var _initMedia = function(){
		// map all the media files into media.id, for ease of extraction
		_media = (pageData.media || []).reduce(function(acc, crt){
			acc[ crt._id ] = crt;
			return acc;
		}, {});
	};



	var _initTags = function(){
		_prio_tags = _settings.tag_prio.split("<|>")
		.reduce(function(acc, crt){
			var components = crt.split("~");

			if (pageData.tags.indexOf(components[0]) != -1 && parseInt(components[1]) > 0 ){
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
			texts 			: {
				home : {
					tagline : _settings.homepage_tagline
				}
			}
		};
	};

	_getPosts = function(){
		return _posts;
	};

	_getTags = function(){
		return _prio_tags;
	}


	_init();

	return {
		getPosts 		: _getPosts,
		getTags 		: _getTags,
		getHomeContext	: _getHomeContext
	};
};


AppDispatcher.register(function(action) {

	console.log('dispatcher dispatched:', action);

});


module.exports = BlogStore;
