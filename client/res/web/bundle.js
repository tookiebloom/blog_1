(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"C:\\workbench\\repos\\tookiebloom\\blog_1\\client\\interfaces\\web\\app\\app.js":[function(require,module,exports){
var IndexPage = require('./pages/index.js');
var ContactPage = require('./pages/contact.js');

// not using an ES6 transpiler
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Link = ReactRouter.Link;
var browserHistory = ReactRouter.browserHistory;




  ReactDOM.render(
	  React.createElement(Router, {history: browserHistory}, 
	      React.createElement(Route, {path: "contact", component: ContactPage}), 

	      React.createElement(Route, {path: "*", component: IndexPage})
	    ),
  document.getElementById('react-app')
);
},{"./pages/contact.js":"C:\\workbench\\repos\\tookiebloom\\blog_1\\client\\interfaces\\web\\app\\pages\\contact.js","./pages/index.js":"C:\\workbench\\repos\\tookiebloom\\blog_1\\client\\interfaces\\web\\app\\pages\\index.js"}],"C:\\workbench\\repos\\tookiebloom\\blog_1\\client\\interfaces\\web\\app\\components\\BlogPost.js":[function(require,module,exports){
/*Bootstrap Classes*/
var Grid = ReactBootstrap.Grid;
var Row = ReactBootstrap.Row;
var Col = ReactBootstrap.Col;


var sanitizePostContent = function(state){
	var content = state.content;

	if( state.isTeaser ) {
		img_string = "";

		var image_index = content.indexOf("<img");

		if( image_index != -1 ){
			//avem imagine
			var end_index = content.indexOf("/>", image_index) + 2;

			var img_string = content.substring(image_index, end_index);

		}


		content = content.replace(/<(?:.|\n)*?>/gm, '');

		content += img_string;

		if( content.length > 300 ) {
			content = content.substr(0,300);
			content += ' <a href="#">[read more]</a>';
		}
	}

	return {
		__html : content
	}
}



var BlogPost = React.createClass({displayName: "BlogPost",
	contextTypes: {
    	media			: React.PropTypes.object,
		tag_color_map	: React.PropTypes.object,
		texts			: React.PropTypes.object
	},

	getInitialState : function(){

		return {
			title : this.props.postData.headline || '',
			meta : this.props.postData.created || '',
			content: this.props.postData.body || '',
			tags: this.props.postData.tags || [],
			primary_image : this.props.postData.primary_image_id ? this.context.media[ this.props.postData.primary_image_id  ] : false,
			isTeaser: this.props.isTeaser
		}
	},

	render: function() {
		var context = this.context;


		return (

			React.createElement("article", {className: "blog-post"}, 


				React.createElement("h2", null, this.state.title), 
				React.createElement("div", {className: "post-meta"}, this.state.meta), 

				 this.state.primary_image ?
					(React.createElement("figure", null, 
						React.createElement("img", {src: "/" + this.state.primary_image.url, alt: this.state.primary_image.original_name})
					)):
					null, 
				


				React.createElement("div", {className: "post-content", dangerouslySetInnerHTML: sanitizePostContent( this.state)}), 

				React.createElement("div", {className: "post-buttons"}, 
					React.createElement("a", {className: "full-post", href: "#"}, 
						React.createElement("i", {className: "fa fa-align-justify"}), 
						"View full article"
					), 
					React.createElement("a", {className: "post-comments-button", href: "#"}, 
						React.createElement("i", {className: "fa fa-comments-o"}), 
						"See comments"
					)
				), 

				React.createElement("div", {className: "post-tags"}, 
					this.state.tags.map(function(tag, i){
						return React.createElement("a", {href: "#", className: context.tag_color_map[tag] || '', key: i}, tag)
					})
				)
			)
		);
	}

});


module.exports = BlogPost;
},{}],"C:\\workbench\\repos\\tookiebloom\\blog_1\\client\\interfaces\\web\\app\\components\\BlogRoll.js":[function(require,module,exports){
/*Bootstrap Classes*/
var Grid = ReactBootstrap.Grid;
var Row = ReactBootstrap.Row;
var Col = ReactBootstrap.Col;


var BlogPost = require('./BlogPost.js');


var BlogRoll = React.createClass({displayName: "BlogRoll",

	contextTypes: {
    	media			: React.PropTypes.object,
		tag_color_map	: React.PropTypes.object,
		texts			: React.PropTypes.object
	},

	childContextTypes : {
    	media			: React.PropTypes.object,
		tag_color_map	: React.PropTypes.object,
		texts			: React.PropTypes.object
    },

	getChildContext : function(){
		return this.context;
	},

	getInitialState : function(){
		return {
			posts	: this.props.posts,
			tags	: this.props.tags
		}
	},

	render: function() {

		var posts 		= this.state.posts;
		var tags		= this.state.tags;
		var context 	= this.context;



		return (
			React.createElement(Row, {className: "blog-roll"}, 

				React.createElement(Col, {xs: 12}, 

					React.createElement("div", {className: "tags"}, 
						React.createElement("h5", null, "Main tags:"), 
						React.createElement("div", {className: "tags-wrapper"}, 
							tags.map(function(tag, i){
								return React.createElement("a", {className: "tag-button " + (context.tag_color_map[tag.name] || ''), href: "#", key: i}, tag.name)
							})
						)
					), 

					React.createElement("div", {className: "post-list"}, 
						posts.map(function(post){
							return React.createElement(BlogPost, {key: post._id, postData: post, isTeaser: true})
						})
					), 

					React.createElement("div", {className: "load-more"}, 
						React.createElement("a", {href: "#", className: "load-more-button "}, 
							React.createElement("i", {className: "fa  fa-refresh"}), 
							React.createElement("span", {className: "active-label"}, "Loading..."), 
							React.createElement("span", {className: "passive-label"}, "Load more")
						)
					)



				)
			)
		);
	}

});


module.exports = BlogRoll;
},{"./BlogPost.js":"C:\\workbench\\repos\\tookiebloom\\blog_1\\client\\interfaces\\web\\app\\components\\BlogPost.js"}],"C:\\workbench\\repos\\tookiebloom\\blog_1\\client\\interfaces\\web\\app\\components\\Footer.js":[function(require,module,exports){
/*Bootstrap Classes*/
var Grid = ReactBootstrap.Grid;
var Row = ReactBootstrap.Row;
var Col = ReactBootstrap.Col;


var Footer = React.createClass({displayName: "Footer",

	render: function() {
		return (
			React.createElement(Row, {className: "footer"}, 
				"Copyright © @beni & @Lumi"
			)
		);
	}

});


module.exports = Footer;
},{}],"C:\\workbench\\repos\\tookiebloom\\blog_1\\client\\interfaces\\web\\app\\components\\Header.js":[function(require,module,exports){
/*Bootstrap Classes*/
var Grid = ReactBootstrap.Grid;
var Row = ReactBootstrap.Row;
var Col = ReactBootstrap.Col;


var Header = React.createClass({displayName: "Header",

	render: function() {
		return (
			React.createElement(Row, {className: "header"}, 
				React.createElement(Col, {xs: 6}, 
					React.createElement("a", {className: "logo-wrapper", href: "/"}, 
						React.createElement("img", {src: "/res/web/img/logo.png"})
					)
				), 
				React.createElement(Col, {xs: 6}, 
					React.createElement("div", {className: "header-buttons pull-right"}, 
						React.createElement("a", {href: "#", className: "login header-button"}, 
							React.createElement("i", {className: "fa fa-user"})
						), 
						React.createElement("a", {href: "#", className: "contact header-button"}, 
							React.createElement("i", {className: "fa fa-envelope-o"})
						)
					)
				)
			)
		);
	}

});


module.exports = Header;
},{}],"C:\\workbench\\repos\\tookiebloom\\blog_1\\client\\interfaces\\web\\app\\components\\Suggestions.js":[function(require,module,exports){
/*Bootstrap Classes*/
var Grid = ReactBootstrap.Grid;
var Row = ReactBootstrap.Row;
var Col = ReactBootstrap.Col;


var Suggestions = React.createClass({displayName: "Suggestions",

	render: function() {
		return (
			React.createElement("div", {className: "suggestions"}, 


				React.createElement("h3", null, "Most relevant posts"), 

				React.createElement("h4", null, "Programming:"), 
				React.createElement("a", {href: "#"}, "Script Master race article "), 
				React.createElement("a", {href: "#"}, "Moer Programming stuff!"), 
				React.createElement("a", {href: "#"}, "To program or not to program? this is the question! "), 
				React.createElement("a", {href: "#"}, "Obligatory Lumisor  post"), 

				React.createElement("h4", null, "Javascript:"), 

				React.createElement("a", {href: "#"}, "Is Javascript really that great?"), 
				React.createElement("a", {href: "#"}, "What if not?"), 
				React.createElement("a", {href: "#"}, "What Javascript is and what javascript is not"), 
				React.createElement("a", {href: "#"}, "More lumisor  ofc"), 
				React.createElement("a", {href: "#"}, "There is no Javascript only ")
			)
		);
	}

});


module.exports = Suggestions;
},{}],"C:\\workbench\\repos\\tookiebloom\\blog_1\\client\\interfaces\\web\\app\\pages\\contact.js":[function(require,module,exports){

var variablePassed = 0;



var Contact = React.createClass({displayName: "Contact",
	getInitialState: function() {
		return {variablePassed: 1};
	},

	componentDidMount: function() {
		var self = this;

		setInterval(function(){

			var state = self.state;

			state.variablePassed++;
			self.setState(state);
		}, 1000);
	},

  render: function() {
    return (

      React.createElement("div", {className: "Contact"}, " dsadsa" + ' ' +
        "Hello, world! This is the contact page, next is the comment box:"

      )
    );
  }

});


module.exports = Contact;
},{}],"C:\\workbench\\repos\\tookiebloom\\blog_1\\client\\interfaces\\web\\app\\pages\\index.js":[function(require,module,exports){
/*Bootstrap Classes*/
var Grid = ReactBootstrap.Grid;
var Row = ReactBootstrap.Row;
var Col = ReactBootstrap.Col;

/*Components*/
var Header = require('../components/Header.js');
var BlogRoll = require('../components/BlogRoll.js');
var Suggestions = require('../components/Suggestions.js');
var Footer = require('../components/Footer.js');


/*Stores*/
var blog_store = require('../stores/BlogStore.js')();

/*context*/
var root_context = blog_store.getHomeContext();


var Index = React.createClass({displayName: "Index",

	childContextTypes : {
    	media			: React.PropTypes.object,
		tag_color_map	: React.PropTypes.object,
		texts			: React.PropTypes.object
    },

	getChildContext : function(){
		return root_context;
	},


	getInitialState : function(){
		return {
			posts: blog_store.getPosts(),
			tags : blog_store.getTags()
		}
	},

	render: function() {

		return (
			React.createElement(Grid, null, 
				React.createElement(Header, null), 

				React.createElement(Row, {className: "main-container"}, 
					React.createElement(Col, {xs: 12}, 
						React.createElement("h1", {className: "main-title"}, root_context.texts.home.tagline)
					), 

					React.createElement(Col, {xs: 12, md: 9}, 
						React.createElement(BlogRoll, {tags: this.state.tags, posts: this.state.posts})
					), 

					React.createElement(Col, {xs: 12, md: 3}, 
						React.createElement(Suggestions, null)
					)

				), 

				React.createElement(Footer, null)
			)
		);
	}

});
module.exports = Index;
},{"../components/BlogRoll.js":"C:\\workbench\\repos\\tookiebloom\\blog_1\\client\\interfaces\\web\\app\\components\\BlogRoll.js","../components/Footer.js":"C:\\workbench\\repos\\tookiebloom\\blog_1\\client\\interfaces\\web\\app\\components\\Footer.js","../components/Header.js":"C:\\workbench\\repos\\tookiebloom\\blog_1\\client\\interfaces\\web\\app\\components\\Header.js","../components/Suggestions.js":"C:\\workbench\\repos\\tookiebloom\\blog_1\\client\\interfaces\\web\\app\\components\\Suggestions.js","../stores/BlogStore.js":"C:\\workbench\\repos\\tookiebloom\\blog_1\\client\\interfaces\\web\\app\\stores\\BlogStore.js"}],"C:\\workbench\\repos\\tookiebloom\\blog_1\\client\\interfaces\\web\\app\\stores\\BlogStore.js":[function(require,module,exports){
const Events = require('events');
var assign = require('object-assign');


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


module.exports = BlogStore;
},{"events":"C:\\workbench\\repos\\tookiebloom\\blog_1\\node_modules\\browserify\\node_modules\\events\\events.js","object-assign":"C:\\workbench\\repos\\tookiebloom\\blog_1\\node_modules\\object-assign\\index.js"}],"C:\\workbench\\repos\\tookiebloom\\blog_1\\node_modules\\browserify\\node_modules\\events\\events.js":[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      }
      throw TypeError('Uncaught, unspecified "error" event.');
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}

},{}],"C:\\workbench\\repos\\tookiebloom\\blog_1\\node_modules\\object-assign\\index.js":[function(require,module,exports){
/* eslint-disable no-unused-vars */
'use strict';
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

module.exports = Object.assign || function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (Object.getOwnPropertySymbols) {
			symbols = Object.getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

},{}]},{},["C:\\workbench\\repos\\tookiebloom\\blog_1\\client\\interfaces\\web\\app\\app.js"])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJDOlxcd29ya2JlbmNoXFxyZXBvc1xcdG9va2llYmxvb21cXGJsb2dfMVxcY2xpZW50XFxpbnRlcmZhY2VzXFx3ZWJcXGFwcFxcYXBwLmpzIiwiQzpcXHdvcmtiZW5jaFxccmVwb3NcXHRvb2tpZWJsb29tXFxibG9nXzFcXGNsaWVudFxcaW50ZXJmYWNlc1xcd2ViXFxhcHBcXGNvbXBvbmVudHNcXEJsb2dQb3N0LmpzIiwiQzpcXHdvcmtiZW5jaFxccmVwb3NcXHRvb2tpZWJsb29tXFxibG9nXzFcXGNsaWVudFxcaW50ZXJmYWNlc1xcd2ViXFxhcHBcXGNvbXBvbmVudHNcXEJsb2dSb2xsLmpzIiwiQzpcXHdvcmtiZW5jaFxccmVwb3NcXHRvb2tpZWJsb29tXFxibG9nXzFcXGNsaWVudFxcaW50ZXJmYWNlc1xcd2ViXFxhcHBcXGNvbXBvbmVudHNcXEZvb3Rlci5qcyIsIkM6XFx3b3JrYmVuY2hcXHJlcG9zXFx0b29raWVibG9vbVxcYmxvZ18xXFxjbGllbnRcXGludGVyZmFjZXNcXHdlYlxcYXBwXFxjb21wb25lbnRzXFxIZWFkZXIuanMiLCJDOlxcd29ya2JlbmNoXFxyZXBvc1xcdG9va2llYmxvb21cXGJsb2dfMVxcY2xpZW50XFxpbnRlcmZhY2VzXFx3ZWJcXGFwcFxcY29tcG9uZW50c1xcU3VnZ2VzdGlvbnMuanMiLCJDOlxcd29ya2JlbmNoXFxyZXBvc1xcdG9va2llYmxvb21cXGJsb2dfMVxcY2xpZW50XFxpbnRlcmZhY2VzXFx3ZWJcXGFwcFxccGFnZXNcXGNvbnRhY3QuanMiLCJDOlxcd29ya2JlbmNoXFxyZXBvc1xcdG9va2llYmxvb21cXGJsb2dfMVxcY2xpZW50XFxpbnRlcmZhY2VzXFx3ZWJcXGFwcFxccGFnZXNcXGluZGV4LmpzIiwiQzpcXHdvcmtiZW5jaFxccmVwb3NcXHRvb2tpZWJsb29tXFxibG9nXzFcXGNsaWVudFxcaW50ZXJmYWNlc1xcd2ViXFxhcHBcXHN0b3Jlc1xcQmxvZ1N0b3JlLmpzIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2V2ZW50cy9ldmVudHMuanMiLCJub2RlX21vZHVsZXMvb2JqZWN0LWFzc2lnbi9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLElBQUksU0FBUyxHQUFHLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBQzVDLElBQUksV0FBVyxHQUFHLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDOztBQUVoRCw4QkFBOEI7QUFDOUIsSUFBSSxNQUFNLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQztBQUNoQyxJQUFJLEtBQUssR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDO0FBQzlCLElBQUksSUFBSSxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUM7QUFDNUIsSUFBSSxjQUFjLEdBQUcsV0FBVyxDQUFDLGNBQWMsQ0FBQztBQUNoRDtBQUNBO0FBQ0E7O0VBRUUsUUFBUSxDQUFDLE1BQU07R0FDZCxvQkFBQyxNQUFNLEVBQUEsQ0FBQSxDQUFDLE9BQUEsRUFBTyxDQUFFLGNBQWdCLENBQUEsRUFBQTtBQUNwQyxPQUFPLG9CQUFDLEtBQUssRUFBQSxDQUFBLENBQUMsSUFBQSxFQUFJLENBQUMsU0FBQSxFQUFTLENBQUMsU0FBQSxFQUFTLENBQUUsV0FBYSxDQUFRLENBQUEsRUFBQTs7T0FFdEQsb0JBQUMsS0FBSyxFQUFBLENBQUEsQ0FBQyxJQUFBLEVBQUksQ0FBQyxHQUFBLEVBQUcsQ0FBQyxTQUFBLEVBQVMsQ0FBRSxTQUFXLENBQVEsQ0FBQTtLQUN2QyxDQUFBO0VBQ1osUUFBUSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUM7Q0FDckMsQ0FBQzs7QUNuQkYscUJBQXFCO0FBQ3JCLElBQUksSUFBSSxHQUFHLGNBQWMsQ0FBQyxJQUFJLENBQUM7QUFDL0IsSUFBSSxHQUFHLEdBQUcsY0FBYyxDQUFDLEdBQUcsQ0FBQztBQUM3QixJQUFJLEdB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QUFPLEtBQUssUUFBUTtFQUNwQixjQUFjLEdBQUcsZUFBZTtFQUNoQyxDQUFDO0FBQ0gsQ0FBQyxDQUFDO0FBQ0Y7O0FBRUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUM7O0FDL0YzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgSW5kZXhQYWdlID0gcmVxdWlyZSgnLi9wYWdlcy9pbmRleC5qcycpO1xyXG52YXIgQ29udGFjdFBhZ2UgPSByZXF1aXJlKCcuL3BhZ2VzL2NvbnRhY3QuanMnKTtcclxuXHJcbi8vIG5vdCB1c2luZyBhbiBFUzYgdHJhbnNwaWxlclxyXG52YXIgUm91dGVyID0gUmVhY3RSb3V0ZXIuUm91dGVyO1xyXG52YXIgUm91dGUgPSBSZWFjdFJvdXRlci5Sb3V0ZTtcclxudmFyIExpbmsgPSBSZWFjdFJvdXRlci5MaW5rO1xyXG52YXIgYnJvd3Nlckhpc3RvcnkgPSBSZWFjdFJvdXRlci5icm93c2VySGlzdG9yeTtcclxuXHJcblxyXG5cclxuXHJcbiAgUmVhY3RET00ucmVuZGVyKFxyXG5cdCAgPFJvdXRlciBoaXN0b3J5PXticm93c2VySGlzdG9yeX0+XHJcblx0ICAgICAgPFJvdXRlIHBhdGg9XCJjb250YWN0XCIgY29tcG9uZW50PXtDb250YWN0UGFnZX0+PC9Sb3V0ZT5cclxuXHJcblx0ICAgICAgPFJvdXRlIHBhdGg9XCIqXCIgY29tcG9uZW50PXtJbmRleFBhZ2V9PjwvUm91dGU+XHJcblx0ICAgIDwvUm91dGVyPixcclxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVhY3QtYXBwJylcclxuKTtcclxuIiwiLypCb290c3RyYXAgQ2xhc3NlcyovXHJcbnZhciBHcmlkID0gUmVhY3RCb290c3RyYXAuR3JpZDtcclxudmFyIFJvdyA9IFJlYWN0Qm9vdHN0cmFwLlJvdztcclxudmFyIENvbCA9IFJlYWN0Qm9vdHN0cmFwLkNvbDtcclxuXHJcblxyXG52YXIgc2FuaXRpemVQb3N0Q29udGVudCA9IGZ1bmN0aW9uKHN0YXRlKXtcclxuXHR2YXIgY29udGVudCA9IHN0YXRlLmNvbnRlbnQ7XHJcblxyXG5cdGlmKCBzdGF0ZS5pc1RlYXNlciApIHtcclxuXHRcdGltZ19zdHJpbmcgPSBcIlwiO1xyXG5cclxuXHRcdHZhciBpbWFnZV9pbmRleCA9IGNvbnRlbnQuaW5kZXhPZihcIjxpbWdcIik7XHJcblxyXG5cdFx0aWYoIGltYWdlX2luZGV4ICE9IC0xICl7XHJcblx0XHRcdC8vYXZlbSBpbWFnaW5lXHJcblx0XHRcdHZhciBlbmRfaW5kZXggPSBjb250ZW50LmluZGV4T2YoXCIvPlwiLCBpbWFnZV9pbmRleCkgKyAyO1xyXG5cclxuXHRcdFx0dmFyIGltZ19zdHJpbmcgPSBjb250ZW50LnN1YnN0cmluZyhpbWFnZV9pbmRleCwgZW5kX2luZGV4KTtcclxuXHJcblx0XHR9XHJcblxyXG5cclxuXHRcdGNvbnRlbnQgPSBjb250ZW50LnJlcGxhY2UoLzwoPzoufFxcbikqPz4vZ20sICcnKTtcclxuXHJcblx0XHRjb250ZW50ICs9IGltZ19zdHJpbmc7XHJcblxyXG5cdFx0aWYoIGNvbnRlbnQubGVuZ3RoID4gMzAwICkge1xyXG5cdFx0XHRjb250ZW50ID0gY29udGVudC5zdWJzdHIoMCwzMDApO1xyXG5cdFx0XHRjb250ZW50ICs9ICcgPGEgaHJlZj1cIiNcIj5bcmVhZCBtb3JlXTwvYT4nO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cmV0dXJuIHtcclxuXHRcdF9faHRtbCA6IGNvbnRlbnRcclxuXHR9XHJcbn1cclxuXHJcblxyXG5cclxudmFyIEJsb2dQb3N0ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cdGNvbnRleHRUeXBlczoge1xyXG4gICAgXHRtZWRpYVx0XHRcdDogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcclxuXHRcdHRhZ19jb2xvcl9tYXBcdDogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcclxuXHRcdHRleHRzXHRcdFx0OiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0XHJcblx0fSxcclxuXHJcblx0Z2V0SW5pdGlhbFN0YXRlIDogZnVuY3Rpb24oKXtcclxuXHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHR0aXRsZSA6IHRoaXMucHJvcHMucG9zdERhdGEuaGVhZGxpbmUgfHwgJycsXHJcblx0XHRcdG1ldGEgOiB0aGlzLnByb3BzLnBvc3REYXRhLmNyZWF0ZWQgfHwgJycsXHJcblx0XHRcdGNvbnRlbnQ6IHRoaXMucHJvcHMucG9zdERhdGEuYm9keSB8fCAnJyxcclxuXHRcdFx0dGFnczogdGhpcy5wcm9wcy5wb3N0RGF0YS50YWdzIHx8IFtdLFxyXG5cdFx0XHRwcmltYXJ5X2ltYWdlIDogdGhpcy5wcm9wcy5wb3N0RGF0YS5wcmltYXJ5X2ltYWdlX2lkID8gdGhpcy5jb250ZXh0Lm1lZGlhWyB0aGlzLnByb3BzLnBvc3REYXRhLnByaW1hcnlfaW1hZ2VfaWQgIF0gOiBmYWxzZSxcclxuXHRcdFx0aXNUZWFzZXI6IHRoaXMucHJvcHMuaXNUZWFzZXJcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHRyZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG5cdFx0dmFyIGNvbnRleHQgPSB0aGlzLmNvbnRleHQ7XHJcblxyXG5cclxuXHRcdHJldHVybiAoXHJcblxyXG5cdFx0XHQ8YXJ0aWNsZSBjbGFzc05hbWU9XCJibG9nLXBvc3RcIj5cclxuXHJcblxyXG5cdFx0XHRcdDxoMj57dGhpcy5zdGF0ZS50aXRsZX08L2gyPlxyXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicG9zdC1tZXRhXCI+e3RoaXMuc3RhdGUubWV0YX08L2Rpdj5cclxuXHJcblx0XHRcdFx0eyB0aGlzLnN0YXRlLnByaW1hcnlfaW1hZ2UgP1xyXG5cdFx0XHRcdFx0KDxmaWd1cmUgPlxyXG5cdFx0XHRcdFx0XHQ8aW1nIHNyYz17XCIvXCIgKyB0aGlzLnN0YXRlLnByaW1hcnlfaW1hZ2UudXJsfSBhbHQ9e3RoaXMuc3RhdGUucHJpbWFyeV9pbWFnZS5vcmlnaW5hbF9uYW1lfSAvPlxyXG5cdFx0XHRcdFx0PC9maWd1cmU+KTpcclxuXHRcdFx0XHRcdG51bGxcclxuXHRcdFx0XHR9XHJcblxyXG5cclxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInBvc3QtY29udGVudFwiIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXtzYW5pdGl6ZVBvc3RDb250ZW50KCB0aGlzLnN0YXRlICl9IC8+XHJcblxyXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicG9zdC1idXR0b25zXCI+XHJcblx0XHRcdFx0XHQ8YSBjbGFzc05hbWU9XCJmdWxsLXBvc3RcIiBocmVmPVwiI1wiPlxyXG5cdFx0XHRcdFx0XHQ8aSBjbGFzc05hbWU9XCJmYSBmYS1hbGlnbi1qdXN0aWZ5XCI+PC9pPlxyXG5cdFx0XHRcdFx0XHRWaWV3IGZ1bGwgYXJ0aWNsZVxyXG5cdFx0XHRcdFx0PC9hPlxyXG5cdFx0XHRcdFx0PGEgY2xhc3NOYW1lPVwicG9zdC1jb21tZW50cy1idXR0b25cIiBocmVmPVwiI1wiPlxyXG5cdFx0XHRcdFx0XHQ8aSBjbGFzc05hbWU9XCJmYSBmYS1jb21tZW50cy1vXCI+PC9pPlxyXG5cdFx0XHRcdFx0XHRTZWUgY29tbWVudHNcclxuXHRcdFx0XHRcdDwvYT5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHJcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJwb3N0LXRhZ3NcIj5cclxuXHRcdFx0XHRcdHt0aGlzLnN0YXRlLnRhZ3MubWFwKGZ1bmN0aW9uKHRhZywgaSl7XHJcblx0XHRcdFx0XHRcdHJldHVybiA8YSBocmVmPVwiI1wiIGNsYXNzTmFtZT17Y29udGV4dC50YWdfY29sb3JfbWFwW3RhZ10gfHwgJyd9IGtleT17aX0gPnt0YWd9PC9hPlxyXG5cdFx0XHRcdFx0fSl9XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdDwvYXJ0aWNsZT5cclxuXHRcdCk7XHJcblx0fVxyXG5cclxufSk7XHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBCbG9nUG9zdDtcclxuIiwiLypCb290c3RyYXAgQ2xhc3NlcyovXHJcbnZhciBHcmlkID0gUmVhY3RCb290c3RyYXAuR3JpZDtcclxudmFyIFJvdyA9IFJlYWN0Qm9vdHN0cmFwLlJvdztcclxudmFyIENvbCA9IFJlYWN0Qm9vdHN0cmFwLkNvbDtcclxuXHJcblxyXG52YXIgQmxvZ1Bvc3QgPSByZXF1aXJlKCcuL0Jsb2dQb3N0LmpzJyk7XHJcblxyXG5cclxudmFyIEJsb2dSb2xsID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cclxuXHRjb250ZXh0VHlwZXM6IHtcclxuICAgIFx0bWVkaWFcdFx0XHQ6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXHJcblx0XHR0YWdfY29sb3JfbWFwXHQ6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXHJcblx0XHR0ZXh0c1x0XHRcdDogUmVhY3QuUHJvcFR5cGVzLm9iamVjdFxyXG5cdH0sXHJcblxyXG5cdGNoaWxkQ29udGV4dFR5cGVzIDoge1xyXG4gICAgXHRtZWRpYVx0XHRcdDogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcclxuXHRcdHRhZ19jb2xvcl9tYXBcdDogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcclxuXHRcdHRleHRzXHRcdFx0OiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0XHJcbiAgICB9LFxyXG5cclxuXHRnZXRDaGlsZENvbnRleHQgOiBmdW5jdGlvbigpe1xyXG5cdFx0cmV0dXJuIHRoaXMuY29udGV4dDtcclxuXHR9LFxyXG5cclxuXHRnZXRJbml0aWFsU3RhdGUgOiBmdW5jdGlvbigpe1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0cG9zdHNcdDogdGhpcy5wcm9wcy5wb3N0cyxcclxuXHRcdFx0dGFnc1x0OiB0aGlzLnByb3BzLnRhZ3NcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHRyZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdHZhciBwb3N0cyBcdFx0PSB0aGlzLnN0YXRlLnBvc3RzO1xyXG5cdFx0dmFyIHRhZ3NcdFx0PSB0aGlzLnN0YXRlLnRhZ3M7XHJcblx0XHR2YXIgY29udGV4dCBcdD0gdGhpcy5jb250ZXh0O1xyXG5cclxuXHJcblxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PFJvdyBjbGFzc05hbWU9XCJibG9nLXJvbGxcIj5cclxuXHJcblx0XHRcdFx0PENvbCB4cz17MTJ9PlxyXG5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwidGFnc1wiPlxyXG5cdFx0XHRcdFx0XHQ8aDU+TWFpbiB0YWdzOjwvaDU+XHJcblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwidGFncy13cmFwcGVyXCI+XHJcblx0XHRcdFx0XHRcdFx0e3RhZ3MubWFwKGZ1bmN0aW9uKHRhZywgaSl7XHJcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gPGEgY2xhc3NOYW1lPXtcInRhZy1idXR0b24gXCIgKyAoY29udGV4dC50YWdfY29sb3JfbWFwW3RhZy5uYW1lXSB8fCAnJyl9ICBocmVmPVwiI1wiIGtleT17aX0+e3RhZy5uYW1lfTwvYT5cclxuXHRcdFx0XHRcdFx0XHR9KX1cclxuXHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInBvc3QtbGlzdFwiPlxyXG5cdFx0XHRcdFx0XHR7cG9zdHMubWFwKGZ1bmN0aW9uKHBvc3Qpe1xyXG5cdFx0XHRcdFx0XHRcdHJldHVybiA8QmxvZ1Bvc3Qga2V5PXtwb3N0Ll9pZH0gcG9zdERhdGE9e3Bvc3R9IGlzVGVhc2VyPXt0cnVlfSAvPlxyXG5cdFx0XHRcdFx0XHR9KX1cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibG9hZC1tb3JlXCI+XHJcblx0XHRcdFx0XHRcdDxhIGhyZWY9XCIjXCIgY2xhc3NOYW1lPVwibG9hZC1tb3JlLWJ1dHRvbiBcIj5cclxuXHRcdFx0XHRcdFx0XHQ8aSBjbGFzc05hbWU9XCJmYSAgZmEtcmVmcmVzaFwiPjwvaT5cclxuXHRcdFx0XHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJhY3RpdmUtbGFiZWxcIj5Mb2FkaW5nLi4uPC9zcGFuPlxyXG5cdFx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cInBhc3NpdmUtbGFiZWxcIj5Mb2FkIG1vcmU8L3NwYW4+XHJcblx0XHRcdFx0XHRcdDwvYT5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cclxuXHJcblxyXG5cdFx0XHRcdDwvQ29sPlxyXG5cdFx0XHQ8L1Jvdz5cclxuXHRcdCk7XHJcblx0fVxyXG5cclxufSk7XHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBCbG9nUm9sbDtcclxuIiwiLypCb290c3RyYXAgQ2xhc3NlcyovXHJcbnZhciBHcmlkID0gUmVhY3RCb290c3RyYXAuR3JpZDtcclxudmFyIFJvdyA9IFJlYWN0Qm9vdHN0cmFwLlJvdztcclxudmFyIENvbCA9IFJlYWN0Qm9vdHN0cmFwLkNvbDtcclxuXHJcblxyXG52YXIgRm9vdGVyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cclxuXHRyZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PFJvdyBjbGFzc05hbWU9XCJmb290ZXJcIj5cclxuXHRcdFx0XHRDb3B5cmlnaHQgJmNvcHk7IEBiZW5pICYgQEx1bWlcclxuXHRcdFx0PC9Sb3c+XHJcblx0XHQpO1xyXG5cdH1cclxuXHJcbn0pO1xyXG5cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRm9vdGVyO1xyXG4iLCIvKkJvb3RzdHJhcCBDbGFzc2VzKi9cclxudmFyIEdyaWQgPSBSZWFjdEJvb3RzdHJhcC5HcmlkO1xyXG52YXIgUm93ID0gUmVhY3RCb290c3RyYXAuUm93O1xyXG52YXIgQ29sID0gUmVhY3RCb290c3RyYXAuQ29sO1xyXG5cclxuXHJcbnZhciBIZWFkZXIgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblxyXG5cdHJlbmRlcjogZnVuY3Rpb24oKSB7XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8Um93IGNsYXNzTmFtZT1cImhlYWRlclwiPlxyXG5cdFx0XHRcdDxDb2wgeHM9ezZ9ID5cclxuXHRcdFx0XHRcdDxhIGNsYXNzTmFtZT1cImxvZ28td3JhcHBlclwiIGhyZWY9XCIvXCI+XHJcblx0XHRcdFx0XHRcdDxpbWcgc3JjPVwiL3Jlcy93ZWIvaW1nL2xvZ28ucG5nXCIgLz5cclxuXHRcdFx0XHRcdDwvYT5cclxuXHRcdFx0XHQ8L0NvbD5cclxuXHRcdFx0XHQ8Q29sIHhzPXs2fT5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiaGVhZGVyLWJ1dHRvbnMgcHVsbC1yaWdodFwiPlxyXG5cdFx0XHRcdFx0XHQ8YSBocmVmPVwiI1wiIGNsYXNzTmFtZT1cImxvZ2luIGhlYWRlci1idXR0b25cIiA+XHJcblx0XHRcdFx0XHRcdFx0PGkgY2xhc3NOYW1lPVwiZmEgZmEtdXNlclwiIC8+XHJcblx0XHRcdFx0XHRcdDwvYT5cclxuXHRcdFx0XHRcdFx0PGEgaHJlZj1cIiNcIiBjbGFzc05hbWU9XCJjb250YWN0IGhlYWRlci1idXR0b25cIiA+XHJcblx0XHRcdFx0XHRcdFx0PGkgY2xhc3NOYW1lPVwiZmEgZmEtZW52ZWxvcGUtb1wiIC8+XHJcblx0XHRcdFx0XHRcdDwvYT5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdDwvQ29sPlxyXG5cdFx0XHQ8L1Jvdz5cclxuXHRcdCk7XHJcblx0fVxyXG5cclxufSk7XHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBIZWFkZXI7XHJcbiIsIi8qQm9vdHN0cmFwIENsYXNzZXMqL1xyXG52YXIgR3JpZCA9IFJlYWN0Qm9vdHN0cmFwLkdyaWQ7XHJcbnZhciBSb3cgPSBSZWFjdEJvb3RzdHJhcC5Sb3c7XHJcbnZhciBDb2wgPSBSZWFjdEJvb3RzdHJhcC5Db2w7XHJcblxyXG5cclxudmFyIFN1Z2dlc3Rpb25zID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cclxuXHRyZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJzdWdnZXN0aW9uc1wiPlxyXG5cclxuXHJcblx0XHRcdFx0PGgzPk1vc3QgcmVsZXZhbnQgcG9zdHM8L2gzPlxyXG5cclxuXHRcdFx0XHQ8aDQ+UHJvZ3JhbW1pbmc6PC9oND5cclxuXHRcdFx0XHQ8YSBocmVmPVwiI1wiPlNjcmlwdCBNYXN0ZXIgcmFjZSBhcnRpY2xlIDwvYT5cclxuXHRcdFx0XHQ8YSBocmVmPVwiI1wiPk1vZXIgUHJvZ3JhbW1pbmcgc3R1ZmYhPC9hPlxyXG5cdFx0XHRcdDxhIGhyZWY9XCIjXCI+VG8gcHJvZ3JhbSBvciBub3QgdG8gcHJvZ3JhbT8gdGhpcyBpcyB0aGUgcXVlc3Rpb24hIDwvYT5cclxuXHRcdFx0XHQ8YSBocmVmPVwiI1wiPk9ibGlnYXRvcnkgTHVtaXNvciAgcG9zdDwvYT5cclxuXHJcblx0XHRcdFx0PGg0PkphdmFzY3JpcHQ6PC9oND5cclxuXHJcblx0XHRcdFx0PGEgaHJlZj1cIiNcIj5JcyBKYXZhc2NyaXB0IHJlYWxseSB0aGF0IGdyZWF0PzwvYT5cclxuXHRcdFx0XHQ8YSBocmVmPVwiI1wiPldoYXQgaWYgbm90PzwvYT5cclxuXHRcdFx0XHQ8YSBocmVmPVwiI1wiPldoYXQgSmF2YXNjcmlwdCBpcyBhbmQgd2hhdCBqYXZhc2NyaXB0IGlzIG5vdDwvYT5cclxuXHRcdFx0XHQ8YSBocmVmPVwiI1wiPk1vcmUgbHVtaXNvciAgb2ZjPC9hPlxyXG5cdFx0XHRcdDxhIGhyZWY9XCIjXCI+VGhlcmUgaXMgbm8gSmF2YXNjcmlwdCBvbmx5IDwvYT5cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQpO1xyXG5cdH1cclxuXHJcbn0pO1xyXG5cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gU3VnZ2VzdGlvbnM7XHJcbiIsIlxyXG52YXIgdmFyaWFibGVQYXNzZWQgPSAwO1xyXG5cclxuXHJcblxyXG52YXIgQ29udGFjdCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHRnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xyXG5cdFx0cmV0dXJuIHt2YXJpYWJsZVBhc3NlZDogMX07XHJcblx0fSxcclxuXHJcblx0Y29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uKCkge1xyXG5cdFx0dmFyIHNlbGYgPSB0aGlzO1xyXG5cclxuXHRcdHNldEludGVydmFsKGZ1bmN0aW9uKCl7XHJcblxyXG5cdFx0XHR2YXIgc3RhdGUgPSBzZWxmLnN0YXRlO1xyXG5cclxuXHRcdFx0c3RhdGUudmFyaWFibGVQYXNzZWQrKztcclxuXHRcdFx0c2VsZi5zZXRTdGF0ZShzdGF0ZSk7XHJcblx0XHR9LCAxMDAwKTtcclxuXHR9LFxyXG5cclxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIChcclxuXHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiQ29udGFjdFwiPiBkc2Fkc2FcclxuICAgICAgICBIZWxsbywgd29ybGQhIFRoaXMgaXMgdGhlIGNvbnRhY3QgcGFnZSwgbmV4dCBpcyB0aGUgY29tbWVudCBib3g6XHJcblxyXG4gICAgICA8L2Rpdj5cclxuICAgICk7XHJcbiAgfVxyXG5cclxufSk7XHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBDb250YWN0O1xyXG4iLCIvKkJvb3RzdHJhcCBDbGFzc2VzKi9cclxudmFyIEdyaWQgPSBSZWFjdEJvb3RzdHJhcC5HcmlkO1xyXG52YXIgUm93ID0gUmVhY3RCb290c3RyYXAuUm93O1xyXG52YXIgQ29sID0gUmVhY3RCb290c3RyYXAuQ29sO1xyXG5cclxuLypDb21wb25lbnRzKi9cclxudmFyIEhlYWRlciA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvSGVhZGVyLmpzJyk7XHJcbnZhciBCbG9nUm9sbCA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvQmxvZ1JvbGwuanMnKTtcclxudmFyIFN1Z2dlc3Rpb25zID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9TdWdnZXN0aW9ucy5qcycpO1xyXG52YXIgRm9vdGVyID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9Gb290ZXIuanMnKTtcclxuXHJcblxyXG4vKlN0b3JlcyovXHJcbnZhciBibG9nX3N0b3JlID0gcmVxdWlyZSgnLi4vc3RvcmVzL0Jsb2dTdG9yZS5qcycpKCk7XHJcblxyXG4vKmNvbnRleHQqL1xyXG52YXIgcm9vdF9jb250ZXh0ID0gYmxvZ19zdG9yZS5nZXRIb21lQ29udGV4dCgpO1xyXG5cclxuXHJcbnZhciBJbmRleCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHJcblx0Y2hpbGRDb250ZXh0VHlwZXMgOiB7XHJcbiAgICBcdG1lZGlhXHRcdFx0OiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxyXG5cdFx0dGFnX2NvbG9yX21hcFx0OiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxyXG5cdFx0dGV4dHNcdFx0XHQ6IFJlYWN0LlByb3BUeXBlcy5vYmplY3RcclxuICAgIH0sXHJcblxyXG5cdGdldENoaWxkQ29udGV4dCA6IGZ1bmN0aW9uKCl7XHJcblx0XHRyZXR1cm4gcm9vdF9jb250ZXh0O1xyXG5cdH0sXHJcblxyXG5cclxuXHRnZXRJbml0aWFsU3RhdGUgOiBmdW5jdGlvbigpe1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0cG9zdHM6IGJsb2dfc3RvcmUuZ2V0UG9zdHMoKSxcclxuXHRcdFx0dGFncyA6IGJsb2dfc3RvcmUuZ2V0VGFncygpXHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0cmVuZGVyOiBmdW5jdGlvbigpIHtcclxuXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8R3JpZD5cclxuXHRcdFx0XHQ8SGVhZGVyIC8+XHJcblxyXG5cdFx0XHRcdDxSb3cgY2xhc3NOYW1lPVwibWFpbi1jb250YWluZXJcIj5cclxuXHRcdFx0XHRcdDxDb2wgeHM9ezEyfSA+XHJcblx0XHRcdFx0XHRcdDxoMSBjbGFzc05hbWU9XCJtYWluLXRpdGxlXCI+e3Jvb3RfY29udGV4dC50ZXh0cy5ob21lLnRhZ2xpbmV9PC9oMT5cclxuXHRcdFx0XHRcdDwvQ29sPlxyXG5cclxuXHRcdFx0XHRcdDxDb2wgeHM9ezEyfSBtZD17OX0gPlxyXG5cdFx0XHRcdFx0XHQ8QmxvZ1JvbGwgdGFncz17dGhpcy5zdGF0ZS50YWdzfSBwb3N0cz17dGhpcy5zdGF0ZS5wb3N0c30gLz5cclxuXHRcdFx0XHRcdDwvQ29sPlxyXG5cclxuXHRcdFx0XHRcdDxDb2wgeHM9ezEyfSBtZD17M30gPlxyXG5cdFx0XHRcdFx0XHQ8U3VnZ2VzdGlvbnMgLz5cclxuXHRcdFx0XHRcdDwvQ29sPlxyXG5cclxuXHRcdFx0XHQ8L1Jvdz5cclxuXHJcblx0XHRcdFx0PEZvb3RlciAvPlxyXG5cdFx0XHQ8L0dyaWQ+XHJcblx0XHQpO1xyXG5cdH1cclxuXHJcbn0pO1xyXG5tb2R1bGUuZXhwb3J0cyA9IEluZGV4O1xyXG4iLCJjb25zdCBFdmVudHMgPSByZXF1aXJlKCdldmVudHMnKTtcclxudmFyIGFzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcclxuXHJcblxyXG52YXIgQmxvZ1N0b3JlID0gZnVuY3Rpb24oKXtcclxuXHJcblx0dmFyIF9ldmVudF9idXMgPSBhc3NpZ24oe30sRXZlbnRzLmV2ZW50RW1pdHRlciksXHJcblx0XHRfcG9zdHMsIF9tZWRpYSwgX3ByaW9fdGFncywgX3RhZ19jb2xvcl9tYXAsIF9zZXR0aW5ncyA7XHJcblxyXG5cdHZhciBfaW5pdCA9IGZ1bmN0aW9uKCl7XHJcblx0XHQvL2RvIGluaXRcclxuXHRcdHBhZ2VEYXRhID0gcGFnZURhdGEgfHwge307XHJcblxyXG5cdFx0X3Bvc3RzIFx0XHQ9IHBhZ2VEYXRhLnBvc3RzIHx8IFtdO1xyXG5cdFx0X3NldHRpbmdzIFx0PSBwYWdlRGF0YS5zZXR0aW5ncyB8fCB7fTtcclxuXHJcblx0XHRwYWdlRGF0YS5tZWRpYSBcdFx0XHQmJiBfaW5pdE1lZGlhKCk7XHJcblx0XHRfc2V0dGluZ3MudGFnX3ByaW8gXHRcdCYmIF9pbml0VGFncygpO1xyXG5cdFx0X3NldHRpbmdzLnRhZ19jb2xvcnMgXHQmJiBfaW5pdFRhZ0NvbG9yTWFwKCk7XHJcblx0fTtcclxuXHJcblx0dmFyIF9pbml0TWVkaWEgPSBmdW5jdGlvbigpe1xyXG5cdFx0Ly8gbWFwIGFsbCB0aGUgbWVkaWEgZmlsZXMgaW50byBtZWRpYS5pZCwgZm9yIGVhc2Ugb2YgZXh0cmFjdGlvblxyXG5cdFx0X21lZGlhID0gKHBhZ2VEYXRhLm1lZGlhIHx8IFtdKS5yZWR1Y2UoZnVuY3Rpb24oYWNjLCBjcnQpe1xyXG5cdFx0XHRhY2NbIGNydC5faWQgXSA9IGNydDtcclxuXHRcdFx0cmV0dXJuIGFjYztcclxuXHRcdH0sIHt9KTtcclxuXHR9O1xyXG5cclxuXHJcblxyXG5cdHZhciBfaW5pdFRhZ3MgPSBmdW5jdGlvbigpe1xyXG5cdFx0X3ByaW9fdGFncyA9IF9zZXR0aW5ncy50YWdfcHJpby5zcGxpdChcIjx8PlwiKVxyXG5cdFx0LnJlZHVjZShmdW5jdGlvbihhY2MsIGNydCl7XHJcblx0XHRcdHZhciBjb21wb25lbnRzID0gY3J0LnNwbGl0KFwiflwiKTtcclxuXHJcblx0XHRcdGlmIChwYWdlRGF0YS50YWdzLmluZGV4T2YoY29tcG9uZW50c1swXSkgIT0gLTEgJiYgcGFyc2VJbnQoY29tcG9uZW50c1sxXSkgPiAwICl7XHJcblx0XHRcdFx0YWNjLnB1c2goe1xyXG5cdFx0XHRcdFx0bmFtZTogY29tcG9uZW50c1swXSxcclxuXHRcdFx0XHRcdHByaW86IHBhcnNlSW50KGNvbXBvbmVudHNbMV0pXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiBhY2M7XHJcblx0XHR9LFtdKVxyXG5cdFx0LnNvcnQoZnVuY3Rpb24oYSxiKXtcclxuXHRcdFx0aWYoYS5wcmlvIDwgYi5wcmlvKXtcclxuXHRcdFx0XHRyZXR1cm4gLTE7XHJcblx0XHRcdH0gZWxzZSBpZihhLnByaW8gPiBiLnByaW8pIHtcclxuXHRcdFx0XHRyZXR1cm4gMTtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gMDtcclxuXHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdHZhciBfaW5pdFRhZ0NvbG9yTWFwID0gZnVuY3Rpb24oKXtcclxuXHRcdF90YWdfY29sb3JfbWFwID0gX3NldHRpbmdzLnRhZ19jb2xvcnMuc3BsaXQoXCI8fD5cIikucmVkdWNlKGZ1bmN0aW9uKGFjYywgY3J0KXtcclxuXHRcdFx0dmFyIGNvbXBvbmVudHMgPSBjcnQuc3BsaXQoXCJ+XCIpO1xyXG5cdFx0XHRhY2NbY29tcG9uZW50c1swXV0gPSAoY29tcG9uZW50c1sxXSB8fCAnJyk7XHJcblx0XHRcdHJldHVybiBhY2M7XHJcblx0XHR9LHt9KTtcclxuXHR9XHJcblxyXG5cclxuXHR2YXIgX2dldEhvbWVDb250ZXh0ID0gZnVuY3Rpb24oKXtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdG1lZGlhIFx0XHRcdDogX21lZGlhLFxyXG5cdFx0XHR0YWdfY29sb3JfbWFwIFx0OiBfdGFnX2NvbG9yX21hcCxcclxuXHRcdFx0dGV4dHMgXHRcdFx0OiB7XHJcblx0XHRcdFx0aG9tZSA6IHtcclxuXHRcdFx0XHRcdHRhZ2xpbmUgOiBfc2V0dGluZ3MuaG9tZXBhZ2VfdGFnbGluZVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHR9O1xyXG5cclxuXHRfZ2V0UG9zdHMgPSBmdW5jdGlvbigpe1xyXG5cdFx0cmV0dXJuIF9wb3N0cztcclxuXHR9O1xyXG5cclxuXHRfZ2V0VGFncyA9IGZ1bmN0aW9uKCl7XHJcblx0XHRyZXR1cm4gX3ByaW9fdGFncztcclxuXHR9XHJcblxyXG5cclxuXHRfaW5pdCgpO1xyXG5cclxuXHRyZXR1cm4ge1xyXG5cdFx0Z2V0UG9zdHMgXHRcdDogX2dldFBvc3RzLFxyXG5cdFx0Z2V0VGFncyBcdFx0OiBfZ2V0VGFncyxcclxuXHRcdGdldEhvbWVDb250ZXh0XHQ6IF9nZXRIb21lQ29udGV4dFxyXG5cdH07XHJcbn07XHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBCbG9nU3RvcmU7XHJcbiIsIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG5mdW5jdGlvbiBFdmVudEVtaXR0ZXIoKSB7XG4gIHRoaXMuX2V2ZW50cyA9IHRoaXMuX2V2ZW50cyB8fCB7fTtcbiAgdGhpcy5fbWF4TGlzdGVuZXJzID0gdGhpcy5fbWF4TGlzdGVuZXJzIHx8IHVuZGVmaW5lZDtcbn1cbm1vZHVsZS5leHBvcnRzID0gRXZlbnRFbWl0dGVyO1xuXG4vLyBCYWNrd2FyZHMtY29tcGF0IHdpdGggbm9kZSAwLjEwLnhcbkV2ZW50RW1pdHRlci5FdmVudEVtaXR0ZXIgPSBFdmVudEVtaXR0ZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX2V2ZW50cyA9IHVuZGVmaW5lZDtcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX21heExpc3RlbmVycyA9IHVuZGVmaW5lZDtcblxuLy8gQnkgZGVmYXVsdCBFdmVudEVtaXR0ZXJzIHdpbGwgcHJpbnQgYSB3YXJuaW5nIGlmIG1vcmUgdGhhbiAxMCBsaXN0ZW5lcnMgYXJlXG4vLyBhZGRlZCB0byBpdC4gVGhpcyBpcyBhIHVzZWZ1bCBkZWZhdWx0IHdoaWNoIGhlbHBzIGZpbmRpbmcgbWVtb3J5IGxlYWtzLlxuRXZlbnRFbWl0dGVyLmRlZmF1bHRNYXhMaXN0ZW5lcnMgPSAxMDtcblxuLy8gT2J2aW91c2x5IG5vdCBhbGwgRW1pdHRlcnMgc2hvdWxkIGJlIGxpbWl0ZWQgdG8gMTAuIFRoaXMgZnVuY3Rpb24gYWxsb3dzXG4vLyB0aGF0IHRvIGJlIGluY3JlYXNlZC4gU2V0IHRvIHplcm8gZm9yIHVubGltaXRlZC5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuc2V0TWF4TGlzdGVuZXJzID0gZnVuY3Rpb24obikge1xuICBpZiAoIWlzTnVtYmVyKG4pIHx8IG4gPCAwIHx8IGlzTmFOKG4pKVxuICAgIHRocm93IFR5cGVFcnJvcignbiBtdXN0IGJlIGEgcG9zaXRpdmUgbnVtYmVyJyk7XG4gIHRoaXMuX21heExpc3RlbmVycyA9IG47XG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24odHlwZSkge1xuICB2YXIgZXIsIGhhbmRsZXIsIGxlbiwgYXJncywgaSwgbGlzdGVuZXJzO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzKVxuICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuXG4gIC8vIElmIHRoZXJlIGlzIG5vICdlcnJvcicgZXZlbnQgbGlzdGVuZXIgdGhlbiB0aHJvdy5cbiAgaWYgKHR5cGUgPT09ICdlcnJvcicpIHtcbiAgICBpZiAoIXRoaXMuX2V2ZW50cy5lcnJvciB8fFxuICAgICAgICAoaXNPYmplY3QodGhpcy5fZXZlbnRzLmVycm9yKSAmJiAhdGhpcy5fZXZlbnRzLmVycm9yLmxlbmd0aCkpIHtcbiAgICAgIGVyID0gYXJndW1lbnRzWzFdO1xuICAgICAgaWYgKGVyIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgdGhyb3cgZXI7IC8vIFVuaGFuZGxlZCAnZXJyb3InIGV2ZW50XG4gICAgICB9XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoJ1VuY2F1Z2h0LCB1bnNwZWNpZmllZCBcImVycm9yXCIgZXZlbnQuJyk7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlciA9IHRoaXMuX2V2ZW50c1t0eXBlXTtcblxuICBpZiAoaXNVbmRlZmluZWQoaGFuZGxlcikpXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIGlmIChpc0Z1bmN0aW9uKGhhbmRsZXIpKSB7XG4gICAgc3dpdGNoIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICAvLyBmYXN0IGNhc2VzXG4gICAgICBjYXNlIDE6XG4gICAgICAgIGhhbmRsZXIuY2FsbCh0aGlzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDI6XG4gICAgICAgIGhhbmRsZXIuY2FsbCh0aGlzLCBhcmd1bWVudHNbMV0pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzpcbiAgICAgICAgaGFuZGxlci5jYWxsKHRoaXMsIGFyZ3VtZW50c1sxXSwgYXJndW1lbnRzWzJdKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICAvLyBzbG93ZXJcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICAgICAgICBoYW5kbGVyLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIH1cbiAgfSBlbHNlIGlmIChpc09iamVjdChoYW5kbGVyKSkge1xuICAgIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICAgIGxpc3RlbmVycyA9IGhhbmRsZXIuc2xpY2UoKTtcbiAgICBsZW4gPSBsaXN0ZW5lcnMubGVuZ3RoO1xuICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKylcbiAgICAgIGxpc3RlbmVyc1tpXS5hcHBseSh0aGlzLCBhcmdzKTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lciA9IGZ1bmN0aW9uKHR5cGUsIGxpc3RlbmVyKSB7XG4gIHZhciBtO1xuXG4gIGlmICghaXNGdW5jdGlvbihsaXN0ZW5lcikpXG4gICAgdGhyb3cgVHlwZUVycm9yKCdsaXN0ZW5lciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcblxuICBpZiAoIXRoaXMuX2V2ZW50cylcbiAgICB0aGlzLl9ldmVudHMgPSB7fTtcblxuICAvLyBUbyBhdm9pZCByZWN1cnNpb24gaW4gdGhlIGNhc2UgdGhhdCB0eXBlID09PSBcIm5ld0xpc3RlbmVyXCIhIEJlZm9yZVxuICAvLyBhZGRpbmcgaXQgdG8gdGhlIGxpc3RlbmVycywgZmlyc3QgZW1pdCBcIm5ld0xpc3RlbmVyXCIuXG4gIGlmICh0aGlzLl9ldmVudHMubmV3TGlzdGVuZXIpXG4gICAgdGhpcy5lbWl0KCduZXdMaXN0ZW5lcicsIHR5cGUsXG4gICAgICAgICAgICAgIGlzRnVuY3Rpb24obGlzdGVuZXIubGlzdGVuZXIpID9cbiAgICAgICAgICAgICAgbGlzdGVuZXIubGlzdGVuZXIgOiBsaXN0ZW5lcik7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHNbdHlwZV0pXG4gICAgLy8gT3B0aW1pemUgdGhlIGNhc2Ugb2Ygb25lIGxpc3RlbmVyLiBEb24ndCBuZWVkIHRoZSBleHRyYSBhcnJheSBvYmplY3QuXG4gICAgdGhpcy5fZXZlbnRzW3R5cGVdID0gbGlzdGVuZXI7XG4gIGVsc2UgaWYgKGlzT2JqZWN0KHRoaXMuX2V2ZW50c1t0eXBlXSkpXG4gICAgLy8gSWYgd2UndmUgYWxyZWFkeSBnb3QgYW4gYXJyYXksIGp1c3QgYXBwZW5kLlxuICAgIHRoaXMuX2V2ZW50c1t0eXBlXS5wdXNoKGxpc3RlbmVyKTtcbiAgZWxzZVxuICAgIC8vIEFkZGluZyB0aGUgc2Vjb25kIGVsZW1lbnQsIG5lZWQgdG8gY2hhbmdlIHRvIGFycmF5LlxuICAgIHRoaXMuX2V2ZW50c1t0eXBlXSA9IFt0aGlzLl9ldmVudHNbdHlwZV0sIGxpc3RlbmVyXTtcblxuICAvLyBDaGVjayBmb3IgbGlzdGVuZXIgbGVha1xuICBpZiAoaXNPYmplY3QodGhpcy5fZXZlbnRzW3R5cGVdKSAmJiAhdGhpcy5fZXZlbnRzW3R5cGVdLndhcm5lZCkge1xuICAgIGlmICghaXNVbmRlZmluZWQodGhpcy5fbWF4TGlzdGVuZXJzKSkge1xuICAgICAgbSA9IHRoaXMuX21heExpc3RlbmVycztcbiAgICB9IGVsc2Uge1xuICAgICAgbSA9IEV2ZW50RW1pdHRlci5kZWZhdWx0TWF4TGlzdGVuZXJzO1xuICAgIH1cblxuICAgIGlmIChtICYmIG0gPiAwICYmIHRoaXMuX2V2ZW50c1t0eXBlXS5sZW5ndGggPiBtKSB7XG4gICAgICB0aGlzLl9ldmVudHNbdHlwZV0ud2FybmVkID0gdHJ1ZTtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJyhub2RlKSB3YXJuaW5nOiBwb3NzaWJsZSBFdmVudEVtaXR0ZXIgbWVtb3J5ICcgK1xuICAgICAgICAgICAgICAgICAgICAnbGVhayBkZXRlY3RlZC4gJWQgbGlzdGVuZXJzIGFkZGVkLiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ1VzZSBlbWl0dGVyLnNldE1heExpc3RlbmVycygpIHRvIGluY3JlYXNlIGxpbWl0LicsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2V2ZW50c1t0eXBlXS5sZW5ndGgpO1xuICAgICAgaWYgKHR5cGVvZiBjb25zb2xlLnRyYWNlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIC8vIG5vdCBzdXBwb3J0ZWQgaW4gSUUgMTBcbiAgICAgICAgY29uc29sZS50cmFjZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbiA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub25jZSA9IGZ1bmN0aW9uKHR5cGUsIGxpc3RlbmVyKSB7XG4gIGlmICghaXNGdW5jdGlvbihsaXN0ZW5lcikpXG4gICAgdGhyb3cgVHlwZUVycm9yKCdsaXN0ZW5lciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcblxuICB2YXIgZmlyZWQgPSBmYWxzZTtcblxuICBmdW5jdGlvbiBnKCkge1xuICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgZyk7XG5cbiAgICBpZiAoIWZpcmVkKSB7XG4gICAgICBmaXJlZCA9IHRydWU7XG4gICAgICBsaXN0ZW5lci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH1cbiAgfVxuXG4gIGcubGlzdGVuZXIgPSBsaXN0ZW5lcjtcbiAgdGhpcy5vbih0eXBlLCBnKTtcblxuICByZXR1cm4gdGhpcztcbn07XG5cbi8vIGVtaXRzIGEgJ3JlbW92ZUxpc3RlbmVyJyBldmVudCBpZmYgdGhlIGxpc3RlbmVyIHdhcyByZW1vdmVkXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIpIHtcbiAgdmFyIGxpc3QsIHBvc2l0aW9uLCBsZW5ndGgsIGk7XG5cbiAgaWYgKCFpc0Z1bmN0aW9uKGxpc3RlbmVyKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ2xpc3RlbmVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzIHx8ICF0aGlzLl9ldmVudHNbdHlwZV0pXG4gICAgcmV0dXJuIHRoaXM7XG5cbiAgbGlzdCA9IHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgbGVuZ3RoID0gbGlzdC5sZW5ndGg7XG4gIHBvc2l0aW9uID0gLTE7XG5cbiAgaWYgKGxpc3QgPT09IGxpc3RlbmVyIHx8XG4gICAgICAoaXNGdW5jdGlvbihsaXN0Lmxpc3RlbmVyKSAmJiBsaXN0Lmxpc3RlbmVyID09PSBsaXN0ZW5lcikpIHtcbiAgICBkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO1xuICAgIGlmICh0aGlzLl9ldmVudHMucmVtb3ZlTGlzdGVuZXIpXG4gICAgICB0aGlzLmVtaXQoJ3JlbW92ZUxpc3RlbmVyJywgdHlwZSwgbGlzdGVuZXIpO1xuXG4gIH0gZWxzZSBpZiAoaXNPYmplY3QobGlzdCkpIHtcbiAgICBmb3IgKGkgPSBsZW5ndGg7IGktLSA+IDA7KSB7XG4gICAgICBpZiAobGlzdFtpXSA9PT0gbGlzdGVuZXIgfHxcbiAgICAgICAgICAobGlzdFtpXS5saXN0ZW5lciAmJiBsaXN0W2ldLmxpc3RlbmVyID09PSBsaXN0ZW5lcikpIHtcbiAgICAgICAgcG9zaXRpb24gPSBpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocG9zaXRpb24gPCAwKVxuICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICBpZiAobGlzdC5sZW5ndGggPT09IDEpIHtcbiAgICAgIGxpc3QubGVuZ3RoID0gMDtcbiAgICAgIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG4gICAgfSBlbHNlIHtcbiAgICAgIGxpc3Quc3BsaWNlKHBvc2l0aW9uLCAxKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fZXZlbnRzLnJlbW92ZUxpc3RlbmVyKVxuICAgICAgdGhpcy5lbWl0KCdyZW1vdmVMaXN0ZW5lcicsIHR5cGUsIGxpc3RlbmVyKTtcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBmdW5jdGlvbih0eXBlKSB7XG4gIHZhciBrZXksIGxpc3RlbmVycztcblxuICBpZiAoIXRoaXMuX2V2ZW50cylcbiAgICByZXR1cm4gdGhpcztcblxuICAvLyBub3QgbGlzdGVuaW5nIGZvciByZW1vdmVMaXN0ZW5lciwgbm8gbmVlZCB0byBlbWl0XG4gIGlmICghdGhpcy5fZXZlbnRzLnJlbW92ZUxpc3RlbmVyKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApXG4gICAgICB0aGlzLl9ldmVudHMgPSB7fTtcbiAgICBlbHNlIGlmICh0aGlzLl9ldmVudHNbdHlwZV0pXG4gICAgICBkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gZW1pdCByZW1vdmVMaXN0ZW5lciBmb3IgYWxsIGxpc3RlbmVycyBvbiBhbGwgZXZlbnRzXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgZm9yIChrZXkgaW4gdGhpcy5fZXZlbnRzKSB7XG4gICAgICBpZiAoa2V5ID09PSAncmVtb3ZlTGlzdGVuZXInKSBjb250aW51ZTtcbiAgICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKGtleSk7XG4gICAgfVxuICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKCdyZW1vdmVMaXN0ZW5lcicpO1xuICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgbGlzdGVuZXJzID0gdGhpcy5fZXZlbnRzW3R5cGVdO1xuXG4gIGlmIChpc0Z1bmN0aW9uKGxpc3RlbmVycykpIHtcbiAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVycyk7XG4gIH0gZWxzZSBpZiAobGlzdGVuZXJzKSB7XG4gICAgLy8gTElGTyBvcmRlclxuICAgIHdoaWxlIChsaXN0ZW5lcnMubGVuZ3RoKVxuICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcnNbbGlzdGVuZXJzLmxlbmd0aCAtIDFdKTtcbiAgfVxuICBkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO1xuXG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lcnMgPSBmdW5jdGlvbih0eXBlKSB7XG4gIHZhciByZXQ7XG4gIGlmICghdGhpcy5fZXZlbnRzIHx8ICF0aGlzLl9ldmVudHNbdHlwZV0pXG4gICAgcmV0ID0gW107XG4gIGVsc2UgaWYgKGlzRnVuY3Rpb24odGhpcy5fZXZlbnRzW3R5cGVdKSlcbiAgICByZXQgPSBbdGhpcy5fZXZlbnRzW3R5cGVdXTtcbiAgZWxzZVxuICAgIHJldCA9IHRoaXMuX2V2ZW50c1t0eXBlXS5zbGljZSgpO1xuICByZXR1cm4gcmV0O1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lckNvdW50ID0gZnVuY3Rpb24odHlwZSkge1xuICBpZiAodGhpcy5fZXZlbnRzKSB7XG4gICAgdmFyIGV2bGlzdGVuZXIgPSB0aGlzLl9ldmVudHNbdHlwZV07XG5cbiAgICBpZiAoaXNGdW5jdGlvbihldmxpc3RlbmVyKSlcbiAgICAgIHJldHVybiAxO1xuICAgIGVsc2UgaWYgKGV2bGlzdGVuZXIpXG4gICAgICByZXR1cm4gZXZsaXN0ZW5lci5sZW5ndGg7XG4gIH1cbiAgcmV0dXJuIDA7XG59O1xuXG5FdmVudEVtaXR0ZXIubGlzdGVuZXJDb3VudCA9IGZ1bmN0aW9uKGVtaXR0ZXIsIHR5cGUpIHtcbiAgcmV0dXJuIGVtaXR0ZXIubGlzdGVuZXJDb3VudCh0eXBlKTtcbn07XG5cbmZ1bmN0aW9uIGlzRnVuY3Rpb24oYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnZnVuY3Rpb24nO1xufVxuXG5mdW5jdGlvbiBpc051bWJlcihhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdudW1iZXInO1xufVxuXG5mdW5jdGlvbiBpc09iamVjdChhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdvYmplY3QnICYmIGFyZyAhPT0gbnVsbDtcbn1cblxuZnVuY3Rpb24gaXNVbmRlZmluZWQoYXJnKSB7XG4gIHJldHVybiBhcmcgPT09IHZvaWQgMDtcbn1cbiIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG4ndXNlIHN0cmljdCc7XG52YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xudmFyIHByb3BJc0VudW1lcmFibGUgPSBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuXG5mdW5jdGlvbiB0b09iamVjdCh2YWwpIHtcblx0aWYgKHZhbCA9PT0gbnVsbCB8fCB2YWwgPT09IHVuZGVmaW5lZCkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ09iamVjdC5hc3NpZ24gY2Fubm90IGJlIGNhbGxlZCB3aXRoIG51bGwgb3IgdW5kZWZpbmVkJyk7XG5cdH1cblxuXHRyZXR1cm4gT2JqZWN0KHZhbCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0LCBzb3VyY2UpIHtcblx0dmFyIGZyb207XG5cdHZhciB0byA9IHRvT2JqZWN0KHRhcmdldCk7XG5cdHZhciBzeW1ib2xzO1xuXG5cdGZvciAodmFyIHMgPSAxOyBzIDwgYXJndW1lbnRzLmxlbmd0aDsgcysrKSB7XG5cdFx0ZnJvbSA9IE9iamVjdChhcmd1bWVudHNbc10pO1xuXG5cdFx0Zm9yICh2YXIga2V5IGluIGZyb20pIHtcblx0XHRcdGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGZyb20sIGtleSkpIHtcblx0XHRcdFx0dG9ba2V5XSA9IGZyb21ba2V5XTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scykge1xuXHRcdFx0c3ltYm9scyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoZnJvbSk7XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHN5bWJvbHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0aWYgKHByb3BJc0VudW1lcmFibGUuY2FsbChmcm9tLCBzeW1ib2xzW2ldKSkge1xuXHRcdFx0XHRcdHRvW3N5bWJvbHNbaV1dID0gZnJvbVtzeW1ib2xzW2ldXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiB0bztcbn07XG4iXX0=
