(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"C:\\workbench\\repos\\tookiebloom\\blog_1\\client\\interfaces\\web\\app\\actions\\BlogActions.js":[function(require,module,exports){
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
},{"../dispatcher/AppDispatcher.js":"C:\\workbench\\repos\\tookiebloom\\blog_1\\client\\interfaces\\web\\app\\dispatcher\\AppDispatcher.js"}],"C:\\workbench\\repos\\tookiebloom\\blog_1\\client\\interfaces\\web\\app\\app.js":[function(require,module,exports){
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

var BlogActions = require('../actions/BlogActions.js');


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
						React.createElement("a", {href: "", onClick: this._loadMore, className: "load-more-button "}, 
							React.createElement("i", {className: "fa  fa-refresh"}), 
							React.createElement("span", {className: "active-label"}, "Loading..."), 
							React.createElement("span", {className: "passive-label"}, "Load more")
						)
					)



				)
			)
		);
	},


	_loadMore : function(evt){
		evt.preventDefault();
		console.log('doing action');

		BlogActions.doAction("passed text from blogRoll");
	}
});


module.exports = BlogRoll;
},{"../actions/BlogActions.js":"C:\\workbench\\repos\\tookiebloom\\blog_1\\client\\interfaces\\web\\app\\actions\\BlogActions.js","./BlogPost.js":"C:\\workbench\\repos\\tookiebloom\\blog_1\\client\\interfaces\\web\\app\\components\\BlogPost.js"}],"C:\\workbench\\repos\\tookiebloom\\blog_1\\client\\interfaces\\web\\app\\components\\Footer.js":[function(require,module,exports){
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
},{}],"C:\\workbench\\repos\\tookiebloom\\blog_1\\client\\interfaces\\web\\app\\dispatcher\\AppDispatcher.js":[function(require,module,exports){

/*
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * AppDispatcher
 *
 * A singleton that operates as the central hub for application updates.
 */

var Dispatcher = require('flux').Dispatcher;

module.exports = new Dispatcher();
},{"flux":"C:\\workbench\\repos\\tookiebloom\\blog_1\\node_modules\\flux\\index.js"}],"C:\\workbench\\repos\\tookiebloom\\blog_1\\client\\interfaces\\web\\app\\pages\\contact.js":[function(require,module,exports){

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
},{"../dispatcher/AppDispatcher":"C:\\workbench\\repos\\tookiebloom\\blog_1\\client\\interfaces\\web\\app\\dispatcher\\AppDispatcher.js","events":"C:\\workbench\\repos\\tookiebloom\\blog_1\\node_modules\\browserify\\node_modules\\events\\events.js","object-assign":"C:\\workbench\\repos\\tookiebloom\\blog_1\\node_modules\\object-assign\\index.js"}],"C:\\workbench\\repos\\tookiebloom\\blog_1\\node_modules\\browserify\\node_modules\\events\\events.js":[function(require,module,exports){
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

},{}],"C:\\workbench\\repos\\tookiebloom\\blog_1\\node_modules\\browserify\\node_modules\\process\\browser.js":[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = setTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    clearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        setTimeout(drainQueue, 0);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],"C:\\workbench\\repos\\tookiebloom\\blog_1\\node_modules\\flux\\index.js":[function(require,module,exports){
/**
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

module.exports.Dispatcher = require('./lib/Dispatcher');

},{"./lib/Dispatcher":"C:\\workbench\\repos\\tookiebloom\\blog_1\\node_modules\\flux\\lib\\Dispatcher.js"}],"C:\\workbench\\repos\\tookiebloom\\blog_1\\node_modules\\flux\\lib\\Dispatcher.js":[function(require,module,exports){
(function (process){
/**
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule Dispatcher
 * 
 * @preventMunge
 */

'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var invariant = require('fbjs/lib/invariant');

var _prefix = 'ID_';

/**
 * Dispatcher is used to broadcast payloads to registered callbacks. This is
 * different from generic pub-sub systems in two ways:
 *
 *   1) Callbacks are not subscribed to particular events. Every payload is
 *      dispatched to every registered callback.
 *   2) Callbacks can be deferred in whole or part until other callbacks have
 *      been executed.
 *
 * For example, consider this hypothetical flight destination form, which
 * selects a default city when a country is selected:
 *
 *   var flightDispatcher = new Dispatcher();
 *
 *   // Keeps track of which country is selected
 *   var CountryStore = {country: null};
 *
 *   // Keeps track of which city is selected
 *   var CityStore = {city: null};
 *
 *   // Keeps track of the base flight price of the selected city
 *   var FlightPriceStore = {price: null}
 *
 * When a user changes the selected city, we dispatch the payload:
 *
 *   flightDispatcher.dispatch({
 *     actionType: 'city-update',
 *     selectedCity: 'paris'
 *   });
 *
 * This payload is digested by `CityStore`:
 *
 *   flightDispatcher.register(function(payload) {
 *     if (payload.actionType === 'city-update') {
 *       CityStore.city = payload.selectedCity;
 *     }
 *   });
 *
 * When the user selects a country, we dispatch the payload:
 *
 *   flightDispatcher.dispatch({
 *     actionType: 'country-update',
 *     selectedCountry: 'australia'
 *   });
 *
 * This payload is digested by both stores:
 *
 *   CountryStore.dispatchToken = flightDispatcher.register(function(payload) {
 *     if (payload.actionType === 'country-update') {
 *       CountryStore.country = payload.selectedCountry;
 *     }
 *   });
 *
 * When the callback to update `CountryStore` is registered, we save a reference
 * to the returned token. Using this token with `waitFor()`, we can guarantee
 * that `CountryStore` is updated before the callback that updates `CityStore`
 * needs to query its data.
 *
 *   CityStore.dispatchToken = flightDispatcher.register(function(payload) {
 *     if (payload.actionType === 'country-update') {
 *       // `CountryStore.country` may not be updated.
 *       flightDispatcher.waitFor([CountryStore.dispatchToken]);
 *       // `CountryStore.country` is now guaranteed to be updated.
 *
 *       // Select the default city for the new country
 *       CityStore.city = getDefaultCityForCountry(CountryStore.country);
 *     }
 *   });
 *
 * The usage of `waitFor()` can be chained, for example:
 *
 *   FlightPriceStore.dispatchToken =
 *     flightDispatcher.register(function(payload) {
 *       switch (payload.actionType) {
 *         case 'country-update':
 *         case 'city-update':
 *           flightDispatcher.waitFor([CityStore.dispatchToken]);
 *           FlightPriceStore.price =
 *             getFlightPriceStore(CountryStore.country, CityStore.city);
 *           break;
 *     }
 *   });
 *
 * The `country-update` payload will be guaranteed to invoke the stores'
 * registered callbacks in order: `CountryStore`, `CityStore`, then
 * `FlightPriceStore`.
 */

var Dispatcher = (function () {
  function Dispatcher() {
    _classCallCheck(this, Dispatcher);

    this._callbacks = {};
    this._isDispatching = false;
    this._isHandled = {};
    this._isPending = {};
    this._lastID = 1;
  }

  /**
   * Registers a callback to be invoked with every dispatched payload. Returns
   * a token that can be used with `waitFor()`.
   */

  Dispatcher.prototype.register = function register(callback) {
    var id = _prefix + this._lastID++;
    this._callbacks[id] = callback;
    return id;
  };

  /**
   * Removes a callback based on its token.
   */

  Dispatcher.prototype.unregister = function unregister(id) {
    !this._callbacks[id] ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatcher.unregister(...): `%s` does not map to a registered callback.', id) : invariant(false) : undefined;
    delete this._callbacks[id];
  };

  /**
   * Waits for the callbacks specified to be invoked before continuing execution
   * of the current callback. This method should only be used by a callback in
   * response to a dispatched payload.
   */

  Dispatcher.prototype.waitFor = function waitFor(ids) {
    !this._isDispatching ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatcher.waitFor(...): Must be invoked while dispatching.') : invariant(false) : undefined;
    for (var ii = 0; ii < ids.length; ii++) {
      var id = ids[ii];
      if (this._isPending[id]) {
        !this._isHandled[id] ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatcher.waitFor(...): Circular dependency detected while ' + 'waiting for `%s`.', id) : invariant(false) : undefined;
        continue;
      }
      !this._callbacks[id] ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatcher.waitFor(...): `%s` does not map to a registered callback.', id) : invariant(false) : undefined;
      this._invokeCallback(id);
    }
  };

  /**
   * Dispatches a payload to all registered callbacks.
   */

  Dispatcher.prototype.dispatch = function dispatch(payload) {
    !!this._isDispatching ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatch.dispatch(...): Cannot dispatch in the middle of a dispatch.') : invariant(false) : undefined;
    this._startDispatching(payload);
    try {
      for (var id in this._callbacks) {
        if (this._isPending[id]) {
          continue;
        }
        this._invokeCallback(id);
      }
    } finally {
      this._stopDispatching();
    }
  };

  /**
   * Is this Dispatcher currently dispatching.
   */

  Dispatcher.prototype.isDispatching = function isDispatching() {
    return this._isDispatching;
  };

  /**
   * Call the callback stored with the given id. Also do some internal
   * bookkeeping.
   *
   * @internal
   */

  Dispatcher.prototype._invokeCallback = function _invokeCallback(id) {
    this._isPending[id] = true;
    this._callbacks[id](this._pendingPayload);
    this._isHandled[id] = true;
  };

  /**
   * Set up bookkeeping needed when dispatching.
   *
   * @internal
   */

  Dispatcher.prototype._startDispatching = function _startDispatching(payload) {
    for (var id in this._callbacks) {
      this._isPending[id] = false;
      this._isHandled[id] = false;
    }
    this._pendingPayload = payload;
    this._isDispatching = true;
  };

  /**
   * Clear bookkeeping used for dispatching.
   *
   * @internal
   */

  Dispatcher.prototype._stopDispatching = function _stopDispatching() {
    delete this._pendingPayload;
    this._isDispatching = false;
  };

  return Dispatcher;
})();

module.exports = Dispatcher;
}).call(this,require('_process'))

},{"_process":"C:\\workbench\\repos\\tookiebloom\\blog_1\\node_modules\\browserify\\node_modules\\process\\browser.js","fbjs/lib/invariant":"C:\\workbench\\repos\\tookiebloom\\blog_1\\node_modules\\flux\\node_modules\\fbjs\\lib\\invariant.js"}],"C:\\workbench\\repos\\tookiebloom\\blog_1\\node_modules\\flux\\node_modules\\fbjs\\lib\\invariant.js":[function(require,module,exports){
(function (process){
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule invariant
 */

"use strict";

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var invariant = function (condition, format, a, b, c, d, e, f) {
  if (process.env.NODE_ENV !== 'production') {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error('Invariant Violation: ' + format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};

module.exports = invariant;
}).call(this,require('_process'))

},{"_process":"C:\\workbench\\repos\\tookiebloom\\blog_1\\node_modules\\browserify\\node_modules\\process\\browser.js"}],"C:\\workbench\\repos\\tookiebloom\\blog_1\\node_modules\\object-assign\\index.js":[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJDOlxcd29ya2JlbmNoXFxyZXBvc1xcdG9va2llYmxvb21cXGJsb2dfMVxcY2xpZW50XFxpbnRlcmZhY2VzXFx3ZWJcXGFwcFxcYWN0aW9uc1xcQmxvZ0FjdGlvbnMuanMiLCJDOlxcd29ya2JlbmNoXFxyZXBvc1xcdG9va2llYmxvb21cXGJsb2dfMVxcY2xpZW50XFxpbnRlcmZhY2VzXFx3ZWJcXGFwcFxcYXBwLmpzIiwiQzpcXHdvcmtiZW5jaFxccmVwb3NcXHRvb2tpZWJsb29tXFxibG9nXzFcXGNsaWVudFxcaW50ZXJmYWNlc1xcd2ViXFxhcHBcXGNvbXBvbmVudHNcXEJsb2dQb3N0LmpzIiwiQzpcXHdvcmtiZW5jaFxccmVwb3NcXHRvb2tpZWJsb29tXFxibG9nXzFcXGNsaWVudFxcaW50ZXJmYWNlc1xcd2ViXFxhcHBcXGNvbXBvbmVudHNcXEJsb2dSb2xsLmpzIiwiQzpcXHdvcmtiZW5jaFxccmVwb3NcXHRvb2tpZWJsb29tXFxibG9nXzFcXGNsaWVudFxcaW50ZXJmYWNlc1xcd2ViXFxhcHBcXGNvbXBvbmVudHNcXEZvb3Rlci5qcyIsIkM6XFx3b3JrYmVuY2hcXHJlcG9zXFx0b29raWVibG9vbVxcYmxvZ18xXFxjbGllbnRcXGludGVyZmFjZXNcXHdlYlxcYXBwXFxjb21wb25lbnRzXFxIZWFkZXIuanMiLCJDOlxcd29ya2JlbmNoXFxyZXBvc1xcdG9va2llYmxvb21cXGJsb2dfMVxcY2xpZW50XFxpbnRlcmZhY2VzXFx3ZWJcXGFwcFxcY29tcG9uZW50c1xcU3VnZ2VzdGlvbnMuanMiLCJDOlxcd29ya2JlbmNoXFxyZXBvc1xcdG9va2llYmxvb21cXGJsb2dfMVxcY2xpZW50XFxpbnRlcmZhY2VzXFx3ZWJcXGFwcFxcZGlzcGF0Y2hlclxcQXBwRGlzcGF0Y2hlci5qcyIsIkM6XFx3b3JrYmVuY2hcXHJlcG9zXFx0b29raWVibG9vbVxcYmxvZ18xXFxjbGllbnRcXGludGVyZmFjZXNcXHdlYlxcYXBwXFxwYWdlc1xcY29udGFjdC5qcyIsIkM6XFx3b3JrYmVuY2hcXHJlcG9zXFx0b29raWVibG9vbVxcYmxvZ18xXFxjbGllbnRcXGludGVyZmFjZXNcXHdlYlxcYXBwXFxwYWdlc1xcaW5kZXguanMiLCJDOlxcd29ya2JlbmNoXFxyZXBvc1xcdG9va2llYmxvb21cXGJsb2dfMVxcY2xpZW50XFxpbnRlcmZhY2VzXFx3ZWJcXGFwcFxcc3RvcmVzXFxCbG9nU3RvcmUuanMiLCJub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvZXZlbnRzL2V2ZW50cy5qcyIsIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCJub2RlX21vZHVsZXMvZmx1eC9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9mbHV4L2xpYi9EaXNwYXRjaGVyLmpzIiwibm9kZV9tb2R1bGVzL2ZsdXgvbm9kZV9tb2R1bGVzL2ZianMvbGliL2ludmFyaWFudC5qcyIsIm5vZGVfbW9kdWxlcy9vYmplY3QtYXNzaWduL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsSUFBSSxhQUFhLEdBQUcsT0FBTyxDQUFDLGdDQUFnQyxDQUFDLENBQUM7QUFDOUQ7O0FBRUEsSUFBSSxXQUFXLEdBQUc7QUFDbEI7O0FBRUEsQ0FBQyxRQUFRLEVBQUUsU0FBUyxJQUFJLEVBQUU7O0VBRXhCLGFBQWEsQ0FBQyxRQUFRLENBQUM7SUFDckIsVUFBVSxFQUFFLGtCQUFrQjtJQUM5QixJQUFJLEVBQUUsSUFBSTtHQUNYLENBQUMsQ0FBQztBQUNMLEVBQUU7QUFDRjs7QUFFQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBOztBQUVBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsV0FBVyxDQUFDOztBQ3BCN0IsSUFBSSxTQUFTLEdBQUcsT0FBTyxDQUFDLGtCQUFrQixDQUFDLENBQUM7QUFDNUMsSUFBSSxXQUFXLEdBQUcsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUM7O0FBRWhELDhCQUE4QjtBQUM5QixJQUFJLE1BQU0sR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDO0FBQ2hDLElBQUksS0FBSyxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUM7QUFDOUIsSUFBSSxJQUFJLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQztBQUM1QixJQUFJLGNBQWMsR0FBRyxXQUFXLENBQUMsY0FBYyxDQUFDO0FBQ2hEO0FBQ0E7QUFDQTs7RUFFRSxRQUFRLENBQUMsTUFBTTtHQUNkLG9CQUFDLE1BQU0sRUFBQSxDQUFBLENBQUMsT0FBQSxFQUFPLENBQUUsY0FBZ0IsQ0FBQSxFQUFBO0FBQ3BDLE9BQU8sb0JBQUMsS0FBSyxFQUFBLENBQUEsQ0FBQyxJQUFBLEVBQUksQ0FBQyxTQUFBLEVBQVMsQ0FBQyxTQUFBLEVBQVMsQ0FBRSxXQUFhLENBQVEsQ0FBQSxFQUFBOztPQUV0RCxvQkFBQyxLQUFLLEVBQUEsQ0FBQSxDQUFDLElBQUEsRUFBSSxDQUFDLEdBQUEsRUFBRyxDQUFDLFNBQUEsRUFBUyxDQUFFLFNBQVcsQ0FBUSxDQUFBO0tBQ3ZDLENBQUE7RUFDWixRQUFRLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQztDQUNyQyxDQUFDOztBQ25CRixxQkFBcUI7QUFDckIsSUFBSSxJQUFJLEdBQUcsY0FBYyxDQUFDLElBQUksQ0FBQztBQUMvQixJQUFJLEdBQUcsR0FBRyxjQUFjLENBQUMsR0FBRyxDQUFDO0FBQzdCLElBQUksR0FBRyxHQUFHLGNBQWMsQ0FBQyxHQUFHLENBQUM7QUFDN0I7O0FBRUEsSUFBSSxtQkFBbUIsR0FBRyxTQUFTLEtBQUssQ0FBQztBQUN6QyxDQUFDLElBQUksT0FBTyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUM7O0NBRTVCLElBQUksS0FBSyxDQUFDLFFBQVEsR0FBRztBQUN0QixFQUFFLFVBQVUsR0FBRyxFQUFFLENBQUM7O0FBRWxCLEVBQUUsSUFBSSxXQUFXLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQzs7QUFFNUMsRUFBRSxJQUFJLFdBQVcsSUFBSSxDQUFDLENBQUMsRUFBRTs7QUFFekIsR0FBRyxJQUFJLFNBQVMsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7O0FBRTFELEdBQUcsSUFBSSxVQUFVLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsU0FBUyxDQUFDLENBQUM7O0FBRTlELEdBQUc7QUFDSDs7QUFFQSxFQUFFLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLGdCQUFnQixFQUFFLEVBQUUsQ0FBQyxDQUFDOztBQUVsRCxFQUFFLE9BQU8sSUFBSSxVQUFVLENBQUM7O0VBRXRCLElBQUksT0FBTyxDQUFDLE1BQU0sR0FBRyxHQUFHLEdBQUc7R0FDMUIsT0FBTyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0dBQ2hDLE9BQU8sSUFBSSw4QkFBOEIsQ0FBQztHQUMxQztBQUNILEVBQUU7O0NBRUQsT0FBTztFQUNOLE1BQU0sR0FBRyxPQUFPO0VBQ2hCO0FBQ0YsQ0FBQztBQUNEO0FBQ0E7O0FBRUEsSUFBSSw4QkFBOEIsd0JBQUE7Q0FDakMsWUFBWSxFQUFFO0tBQ1YsS0FBSyxLQUFLLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTTtFQUNuQyxhQUFhLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNO0VBQ3RDLEtBQUssS0FBSyxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU07QUFDbEMsRUFBRTs7QUFFRixDQUFDLGVBQWUsR0FBRyxVQUFVOztFQUUzQixPQUFPO0dBQ04sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxFQUFFO0dBQzFDLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxPQUFPLElBQUksRUFBRTtHQUN4QyxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxJQUFJLEVBQUU7R0FDdkMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksSUFBSSxFQUFFO0dBQ3BDLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsR0FBRyxHQUFHLEtBQUs7R0FDMUgsUUFBUSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUTtHQUM3QjtBQUNILEVBQUU7O0NBRUQsTUFBTSxFQUFFLFdBQVc7QUFDcEIsRUFBRSxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO0FBQzdCOztBQUVBLEVBQUU7O0FBRUYsR0FBRyxvQkFBQSxTQUFRLEVBQUEsQ0FBQSxDQUFDLFNBQUEsRUFBUyxDQUFDLFdBQVksQ0FBQSxFQUFBO0FBQ2xDOztJQUVJLG9CQUFBLElBQUcsRUFBQSxJQUFDLEVBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFXLENBQUEsRUFBQTtBQUMvQixJQUFJLG9CQUFBLEtBQUksRUFBQSxDQUFBLENBQUMsU0FBQSxFQUFTLENBQUMsV0FBWSxDQUFBLEVBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFXLENBQUEsRUFBQTs7SUFFakQsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWE7TUFDeEIsb0JBQUEsUUFBTyxFQUFBLElBQUEsQ0FBRSxFQUFBO01BQ1Qsb0JBQUEsS0FBSSxFQUFBLENBQUEsQ0FBQyxHQUFBLEVBQUcsQ0FBRSxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsR0FBRyxFQUFDLENBQUMsR0FBQSxFQUFHLENBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsYUFBYyxDQUFBLENBQUcsQ0FBQTtLQUNyRixDQUFBO0tBQ1QsSUFBSSxFQUFBO0FBQ1QsSUFBSztBQUNMOztBQUVBLElBQUksb0JBQUEsS0FBSSxFQUFBLENBQUEsQ0FBQyxTQUFBLEVBQVMsQ0FBQyxjQUFBLEVBQWMsQ0FBQyx1QkFBQSxFQUF1QixDQUFFLG1CQUFtQixFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUcsQ0FBQSxDQUFHLENBQUEsRUFBQTs7SUFFNUYsb0JBQUEsS0FBSSxFQUFBLENBQUEsQ0FBQyxTQUFBLEVBQVMsQ0FBQyxjQUFlLENBQUEsRUFBQTtLQUM3QixvQkFBQSxHQUFFLEVBQUEsQ0FBQSxDQUFDLFNBQUEsRUFBUyxDQUFDLFdBQUEsRUFBVyxDQUFDLElBQUEsRUFBSSxDQUFDLEdBQUksQ0FBQSxFQUFBO01BQ2pDLG9CQUFBLEdBQUUsRUFBQSxDQUFBLENBQUMsU0FBQSxFQUFTLENBQUMscUJBQXNCLENBQUksQ0FBQSxFQUFBO0FBQUEsTUFBQSxtQkFBQTtBQUFBLEtBRXBDLENBQUEsRUFBQTtLQUNKLG9CQUFBLEdBQUUsRUFBQSxDQUFBLENBQUMsU0FBQSxFQUFTLENBQUMsc0JBQUEsRUFBc0IsQ0FBQyxJQUFBLEVBQUksQ0FBQyxHQUFJLENBQUEsRUFBQTtNQUM1QyxvQkFBQSxHQUFFLEVBQUEsQ0FBQSxDQUFDLFNBQUEsRUFBUyxDQUFDLGtCQUFtQixDQUFJLENBQUEsRUFBQTtBQUFBLE1BQUEsY0FBQTtBQUFBLEtBRWpDLENBQUE7QUFDVCxJQUFVLENBQUEsRUFBQTs7SUFFTixvQkFBQSxLQUFJLEVBQUEsQ0FBQSxDQUFDLFNBQUEsRUFBUyxDQUFDLFdBQVksQ0FBQSxFQUFBO0tBQ3pCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDLENBQUM7TUFDcEMsT0FBTyxvQkFBQSxHQUFFLEVBQUEsQ0FBQSxDQUFDLElBQUEsRUFBSSxDQUFDLEdBQUEsRUFBRyxDQUFDLFNBQUEsRUFBUyxDQUFFLE9BQU8sQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxFQUFDLENBQUMsR0FBQSxFQUFHLENBQUUsQ0FBRSxDQUFFLENBQUEsRUFBQyxHQUFRLENBQUE7TUFDbEYsQ0FBRTtJQUNFLENBQUE7R0FDRyxDQUFBO0lBQ1Q7QUFDSixFQUFFOztBQUVGLENBQUMsQ0FBQyxDQUFDO0FBQ0g7O0FBRUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUM7O0FDeEcxQixxQkFBcUI7QUFDckIsSUFBSSxJQUFJLEdBQUcsY0FBYyxDQUFDLElBQUksQ0FBQztBQUMvQixJQUFJLEdBQUcsR0FBRyxjQUFjLENBQUMsR0FBRyxDQUFDO0FBQzdCLElBQUksR0FBRyxHQUFHLGNBQWMsQ0FBQyxHQUFHLENBQUM7QUFDN0I7O0FBRUEsSUFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDOztBQUV4QyxJQUFJLFdBQVcsR0FBRyxPQUFPLENBQUMsMkJBQTJCLENBQUMsQ0FBQztBQUN2RDs7QUFFQSxJQUFJLDhCQUE4Qix3QkFBQTs7Q0FFakMsWUFBWSxFQUFFO0tBQ1YsS0FBSyxLQUFLLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTTtFQUNuQyxhQUFhLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNO0VBQ3RDLEtBQUssS0FBSyxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU07QUFDbEMsRUFBRTs7Q0FFRCxpQkFBaUIsR0FBRztLQUNoQixLQUFLLEtBQUssS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNO0VBQ25DLGFBQWEsR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU07RUFDdEMsS0FBSyxLQUFLLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTTtBQUNsQyxLQUFLOztDQUVKLGVBQWUsR0FBRyxVQUFVO0VBQzNCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztBQUN0QixFQUFFOztDQUVELGVBQWUsR0FBRyxVQUFVO0VBQzNCLE9BQU87R0FDTixLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLO0dBQ3hCLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUk7R0FDdEI7QUFDSCxFQUFFOztBQUVGLENBQUMsTUFBTSxFQUFFLFdBQVc7O0VBRWxCLElBQUksS0FBSyxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO0VBQy9CLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO0FBQzlCLEVBQUUsSUFBSSxPQUFPLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQztBQUM5QjtBQUNBOztFQUVFO0FBQ0YsR0FBRyxvQkFBQyxHQUFHLEVBQUEsQ0FBQSxDQUFDLFNBQUEsRUFBUyxDQUFDLFdBQVksQ0FBQSxFQUFBOztBQUU5QixJQUFJLG9CQUFDLEdBQUcsRUFBQSxDQUFBLENBQUMsRUFBQSxFQUFFLENBQUUsRUFBSSxDQUFBLEVBQUE7O0tBRVosb0JBQUEsS0FBSSxFQUFBLENBQUEsQ0FBQyxTQUFBLEVBQVMsQ0FBQyxNQUFPLENBQUEsRUFBQTtNQUNyQixvQkFBQSxJQUFHLEVBQUEsSUFBQyxFQUFBLFlBQWUsQ0FBQSxFQUFBO01BQ25CLG9CQUFBLEtBQUksRUFBQSxDQUFBLENBQUMsU0FBQSxFQUFTLENBQUMsY0FBZSxDQUFBLEVBQUE7T0FDNUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDekIsT0FBTyxvQkFBQSxHQUFFLEVBQUEsQ0FBQSxDQUFDLFNBQUEsRUFBUyxDQUFFLGFBQWEsSUFBSSxPQUFPLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBQyxFQUFFLElBQUEsRUFBSSxDQUFDLEdBQUEsRUFBRyxDQUFDLEdBQUEsRUFBRyxDQUFFLENBQUcsQ0FBQSxFQUFDLEdBQUcsQ0FBQyxJQUFTLENBQUE7UUFDOUcsQ0FBRTtNQUNFLENBQUE7QUFDWixLQUFXLENBQUEsRUFBQTs7S0FFTixvQkFBQSxLQUFJLEVBQUEsQ0FBQSxDQUFDLFNBQUEsRUFBUyxDQUFDLFdBQVksQ0FBQSxFQUFBO01BQ3pCLEtBQUssQ0FBQyxHQUFHLENBQUMsU0FBUyxJQUFJLENBQUM7T0FDeEIsT0FBTyxvQkFBQyxRQUFRLEVBQUEsQ0FBQSxDQUFDLEdBQUEsRUFBRyxDQUFFLElBQUksQ0FBQyxHQUFHLEVBQUMsQ0FBQyxRQUFBLEVBQVEsQ0FBRSxJQUFJLEVBQUMsQ0FBQyxRQUFBLEVBQVEsQ0FBRSxJQUFLLENBQUEsQ0FBRyxDQUFBO09BQ2xFLENBQUU7QUFDVCxLQUFXLENBQUEsRUFBQTs7S0FFTixvQkFBQSxLQUFJLEVBQUEsQ0FBQSxDQUFDLFNBQUEsRUFBUyxDQUFDLFdBQVksQ0FBQSxFQUFBO01BQzFCLG9CQUFBLEdBQUUsRUFBQSxDQUFBLENBQUMsSUFBQSxFQUFJLENBQUMsRUFBQSxFQUFFLENBQUMsT0FBQSxFQUFPLENBQUUsSUFBSSxDQUFDLFNBQVMsRUFBQyxDQUFDLFNBQUEsRUFBUyxDQUFDLG1CQUFvQixDQUFBLEVBQUE7T0FDakUsb0JBQUEsR0FBRSxFQUFBLENBQUEsQ0FBQyxTQUFBLEVBQVMsQ0FBQyxnQkFBaUIsQ0FBSSxDQUFBLEVBQUE7T0FDbEMsb0JBQUEsTUFBSyxFQUFBLENBQUEsQ0FBQyxTQUFBLEVBQVMsQ0FBQyxjQUFlLENBQUEsRUFBQSxZQUFpQixDQUFBLEVBQUE7T0FDaEQsb0JBQUEsTUFBSyxFQUFBLENBQUEsQ0FBQyxTQUFBLEVBQVMsQ0FBQyxlQUFnQixDQUFBLEVBQUEsV0FBZ0IsQ0FBQTtNQUM3QyxDQUFBO0FBQ1YsS0FBVyxDQUFBO0FBQ1g7QUFDQTs7SUFFVSxDQUFBO0dBQ0QsQ0FBQTtJQUNMO0FBQ0osRUFBRTtBQUNGOztDQUVDLFNBQVMsR0FBRyxTQUFTLEdBQUcsQ0FBQztFQUN4QixHQUFHLENBQUMsY0FBYyxFQUFFLENBQUM7QUFDdkIsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDOztFQUU1QixXQUFXLENBQUMsUUFBUSxDQUFDLDJCQUEyQixDQUFDLENBQUM7RUFDbEQ7QUFDRixDQUFDLENBQUMsQ0FBQztBQUNIOztBQUVBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDOztBQ3pGMUIscUJBQXFCO0FBQ3JCLElBQUksSUFBSSxHQUFHLGNBQWMsQ0FBQyxJQUFJLENBQUM7QUFDL0IsSUFBSSxHQUFHLEdBQUcsY0FBYyxDQUFDLEdBQUcsQ0FBQztBQUM3QixJQUFJLEdBQUcsR0FBRyxjQUFjLENBQUMsR0FBRyxDQUFDO0FBQzdCOztBQUVBLElBQUksNEJBQTRCLHNCQUFBOztDQUUvQixNQUFNLEVBQUUsV0FBVztFQUNsQjtHQUNDLG9CQUFDLEdBQUcsRUFBQSxDQUFBLENBQUMsU0FBQSxFQUFTLENBQUMsUUFBUyxDQUFBLEVBQUE7QUFBQSxJQUFBLDJCQUFBO0FBQUEsR0FFbEIsQ0FBQTtJQUNMO0FBQ0osRUFBRTs7QUFFRixDQUFDLENBQUMsQ0FBQztBQUNIOztBQUVBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDOztBQ25CeEIscUJBQXFCO0FBQ3JCLElBQUksSUFBSSxHQUFHLGNBQWMsQ0FBQyxJQUFJLENBQUM7QUFDL0IsSUFBSSxHQUFHLEdBQUcsY0FBYyxDQUFDLEdBQUcsQ0FBQztBQUM3QixJQUFJLEdBQUcsR0FBRyxjQUFjLENBQUMsR0FBRyxDQUFDO0FBQzdCOztBQUVBLElBQUksNEJBQTRCLHNCQUFBOztDQUUvQixNQUFNLEVBQUUsV0FBVztFQUNsQjtHQUNDLG9CQUFDLEdBQUcsRUFBQSxDQUFBLENBQUMsU0FBQSxFQUFTLENBQUMsUUFBUyxDQUFBLEVBQUE7SUFDdkIsb0JBQUMsR0FBRyxFQUFBLENBQUEsQ0FBQyxFQUFBLEVBQUUsQ0FBRSxDQUFFLENBQUUsQ0FBQSxFQUFBO0tBQ1osb0JBQUEsR0FBRSxFQUFBLENBQUEsQ0FBQyxTQUFBLEVBQVMsQ0FBQyxjQUFBLEVBQWMsQ0FBQyxJQUFBLEVBQUksQ0FBQyxHQUFJLENBQUEsRUFBQTtNQUNwQyxvQkFBQSxLQUFJLEVBQUEsQ0FBQSxDQUFDLEdBQUEsRUFBRyxDQUFDLHVCQUF1QixDQUFBLENBQUcsQ0FBQTtLQUNoQyxDQUFBO0lBQ0MsQ0FBQSxFQUFBO0lBQ04sb0JBQUMsR0FBRyxFQUFBLENBQUEsQ0FBQyxFQUFBLEVBQUUsQ0FBRSxDQUFHLENBQUEsRUFBQTtLQUNYLG9CQUFBLEtBQUksRUFBQSxDQUFBLENBQUMsU0FBQSxFQUFTLENBQUMsMkJBQTRCLENBQUEsRUFBQTtNQUMxQyxvQkFBQSxHQUFFLEVBQUEsQ0FBQSxDQUFDLElBQUEsRUFBSSxDQUFDLEdBQUEsRUFBRyxDQUFDLFNBQUEsRUFBUyxDQUFDLHFCQUFxQixDQUFFLENBQUEsRUFBQTtPQUM1QyxvQkFBQSxHQUFFLEVBQUEsQ0FBQSxDQUFDLFNBQUEsRUFBUyxDQUFDLFlBQVksQ0FBQSxDQUFHLENBQUE7TUFDekIsQ0FBQSxFQUFBO01BQ0osb0JBQUEsR0FBRSxFQUFBLENBQUEsQ0FBQyxJQUFBLEVBQUksQ0FBQyxHQUFBLEVBQUcsQ0FBQyxTQUFBLEVBQVMsQ0FBQyx1QkFBdUIsQ0FBRSxDQUFBLEVBQUE7T0FDOUMsb0JBQUEsR0FBRSxFQUFBLENBQUEsQ0FBQyxTQUFBLEVBQVMsQ0FBQyxrQkFBa0IsQ0FBQSxDQUFHLENBQUE7TUFDL0IsQ0FBQTtLQUNDLENBQUE7SUFDRCxDQUFBO0dBQ0QsQ0FBQTtJQUNMO0FBQ0osRUFBRTs7QUFFRixDQUFDLENBQUMsQ0FBQztBQUNIOztBQUVBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDOztBQ2pDeEIscUJBQXFCO0FBQ3JCLElBQUksSUFBSSxHQUFHLGNBQWMsQ0FBQyxJQUFJLENBQUM7QUFDL0IsSUFBSSxHQUFHLEdBQUcsY0FBYyxDQUFDLEdBQUcsQ0FBQztBQUM3QixJQUFJLEdBQUcsR0FBRyxjQUFjLENBQUMsR0FBRyxDQUFDO0FBQzdCOztBQUVBLElBQUksaUNBQWlDLDJCQUFBOztDQUVwQyxNQUFNLEVBQUUsV0FBVztFQUNsQjtBQUNGLEdBQUcsb0JBQUEsS0FBSSxFQUFBLENBQUEsQ0FBQyxTQUFBLEVBQVMsQ0FBQyxhQUFjLENBQUEsRUFBQTtBQUNoQzs7QUFFQSxJQUFJLG9CQUFBLElBQUcsRUFBQSxJQUFDLEVBQUEscUJBQXdCLENBQUEsRUFBQTs7SUFFNUIsb0JBQUEsSUFBRyxFQUFBLElBQUMsRUFBQSxjQUFpQixDQUFBLEVBQUE7SUFDckIsb0JBQUEsR0FBRSxFQUFBLENBQUEsQ0FBQyxJQUFBLEVBQUksQ0FBQyxHQUFJLENBQUEsRUFBQSw2QkFBK0IsQ0FBQSxFQUFBO0lBQzNDLG9CQUFBLEdBQUUsRUFBQSxDQUFBLENBQUMsSUFBQSxFQUFJLENBQUMsR0FBSSxDQUFBLEVBQUEseUJBQTJCLENBQUEsRUFBQTtJQUN2QyxvQkFBQSxHQUFFLEVBQUEsQ0FBQSxDQUFDLElBQUEsRUFBSSxDQUFDLEdBQUksQ0FBQSxFQUFBLHNEQUF3RCxDQUFBLEVBQUE7QUFDeEUsSUFBSSxvQkFBQSxHQUFFLEVBQUEsQ0FBQSxDQUFDLElBQUEsRUFBSSxDQUFDLEdBQUksQ0FBQSxFQUFBLDBCQUE0QixDQUFBLEVBQUE7O0FBRTVDLElBQUksb0JBQUEsSUFBRyxFQUFBLElBQUMsRUFBQSxhQUFnQixDQUFBLEVBQUE7O0lBRXBCLG9CQUFBLEdBQUUsRUFBQSxDQUFBLENBQUMsSUFBQSxFQUFJLENBQUMsR0FBSSxDQUFBLEVBQUEsa0NBQW9DLENBQUEsRUFBQTtJQUNoRCxvQkFBQSxHQUFFLEVBQUEsQ0FBQSxDQUFDLElBQUEsRUFBSSxDQUFDLEdBQUksQ0FBQSxFQUFBLGNBQWdCLENBQUEsRUFBQTtJQUM1QixvQkFBQSxHQUFFLEVBQUEsQ0FBQSxDQUFDLElBQUEsRUFBSSxDQUFDLEdBQUksQ0FBQSxFQUFBLCtDQUFpRCxDQUFBLEVBQUE7SUFDN0Qsb0JBQUEsR0FBRSxFQUFBLENBQUEsQ0FBQyxJQUFBLEVBQUksQ0FBQyxHQUFJLENBQUEsRUFBQSxtQkFBcUIsQ0FBQSxFQUFBO0lBQ2pDLG9CQUFBLEdBQUUsRUFBQSxDQUFBLENBQUMsSUFBQSxFQUFJLENBQUMsR0FBSSxDQUFBLEVBQUEsOEJBQWdDLENBQUE7R0FDdkMsQ0FBQTtJQUNMO0FBQ0osRUFBRTs7QUFFRixDQUFDLENBQUMsQ0FBQztBQUNIOztBQUVBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsV0FBVyxDQUFDOztBQ25DN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxHQUFHOztBQUVILElBQUksVUFBVSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxVQUFVLENBQUM7O0FBRTVDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsSUFBSSxVQUFVLEVBQUUsQ0FBQzs7QUNoQmxDO0FBQ0EsSUFBSSxjQUFjLEdBQUcsQ0FBQyxDQUFDO0FBQ3ZCO0FBQ0E7O0FBRUEsSUFBSSw2QkFBNkIsdUJBQUE7Q0FDaEMsZUFBZSxFQUFFLFdBQVc7RUFDM0IsT0FBTyxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUM3QixFQUFFOztDQUVELGlCQUFpQixFQUFFLFdBQVc7QUFDL0IsRUFBRSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7O0FBRWxCLEVBQUUsV0FBVyxDQUFDLFVBQVU7O0FBRXhCLEdBQUcsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQzs7R0FFdkIsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO0dBQ3ZCLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7R0FDckIsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUNYLEVBQUU7O0VBRUEsTUFBTSxFQUFFLFdBQVc7QUFDckIsSUFBSTs7TUFFRSxvQkFBQSxLQUFJLEVBQUEsQ0FBQSxDQUFDLFNBQUEsRUFBUyxDQUFDLFNBQVUsQ0FBQSxFQUFBLGlCQUFBO0FBQUEsUUFBQSxrRUFBQTtBQUFBO0FBQUEsTUFHbkIsQ0FBQTtNQUNOO0FBQ04sR0FBRzs7QUFFSCxDQUFDLENBQUMsQ0FBQztBQUNIOztBQUVBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDOztBQ25DekIscUJBQXFCO0FBQ3JCLElBQUksSUFBSSxHQUFHLGNBQWMsQ0FBQyxJQUFJLENBQUM7QUFDL0IsSUFBSSxHQUFHLEdBQUcsY0FBYyxDQUFDLEdBQUcsQ0FBQztBQUM3QixJQUFJLEdBQUcsR0FBRyxjQUFjLENBQUMsR0FBRyxDQUFDOztBQUU3QixjQUFjO0FBQ2QsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLHlCQUF5QixDQUFDLENBQUM7QUFDaEQsSUFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDLDJCQUEyQixDQUFDLENBQUM7QUFDcEQsSUFBSSxXQUFXLEdBQUcsT0FBTyxDQUFDLDhCQUE4QixDQUFDLENBQUM7QUFDMUQsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLHlCQUF5QixDQUFDLENBQUM7QUFDaEQ7O0FBRUEsVUFBVTtBQUNWLElBQUksVUFBVSxHQUFHLE9BQU8sQ0FBQyx3QkFBd0IsQ0FBQyxFQUFFLENBQUM7O0FBRXJELFdBQVc7QUFDWCxJQUFJLFlBQVksR0FBRyxVQUFVLENBQUMsY0FBYyxFQUFFLENBQUM7QUFDL0M7O0FBRUEsSUFBSSwyQkFBMkIscUJBQUE7O0NBRTlCLGlCQUFpQixHQUFHO0tBQ2hCLEtBQUssS0FBSyxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU07RUFDbkMsYUFBYSxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTTtFQUN0QyxLQUFLLEtBQUssS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNO0FBQ2xDLEtBQUs7O0NBRUosZUFBZSxHQUFHLFVBQVU7RUFDM0IsT0FBTyxZQUFZLENBQUM7QUFDdEIsRUFBRTtBQUNGOztDQUVDLGVBQWUsR0FBRyxVQUFVO0VBQzNCLE9BQU87R0FDTixLQUFLLEVBQUUsVUFBVSxDQUFDLFFBQVEsRUFBRTtHQUM1QixJQUFJLEdBQUcsVUFBVSxDQUFDLE9BQU8sRUFBRTtHQUMzQjtBQUNILEVBQUU7O0FBRUYsQ0FBQyxNQUFNLEVBQUUsV0FBVzs7RUFFbEI7R0FDQyxvQkFBQyxJQUFJLEVBQUEsSUFBQyxFQUFBO0FBQ1QsSUFBSSxvQkFBQyxNQUFNLEVBQUEsSUFBQSxDQUFHLENBQUEsRUFBQTs7SUFFVixvQkFBQyxHQUFHLEVBQUEsQ0FBQSxDQUFDLFNBQUEsRUFBUyxDQUFDLGdCQUFpQixDQUFBLEVBQUE7S0FDL0Isb0JBQUMsR0FBRyxFQUFBLENBQUEsQ0FBQyxFQUFBLEVBQUUsQ0FBRSxFQUFHLENBQUUsQ0FBQSxFQUFBO01BQ2Isb0JBQUEsSUFBRyxFQUFBLENBQUEsQ0FBQyxTQUFBLEVBQVMsQ0FBQyxZQUFhLENBQUEsRUFBQyxZQUFZLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFhLENBQUE7QUFDdkUsS0FBVyxDQUFBLEVBQUE7O0tBRU4sb0JBQUMsR0FBRyxFQUFBLENBQUEsQ0FBQyxFQUFBLEVBQUUsQ0FBRSxFQUFFLEVBQUMsQ0FBQyxFQUFBLEVBQUUsQ0FBRSxDQUFFLENBQUUsQ0FBQSxFQUFBO01BQ3BCLG9CQUFDLFFBQVEsRUFBQSxDQUFBLENBQUMsSUFBQSxFQUFJLENBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUMsQ0FBQyxLQUFBLEVBQUssQ0FBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQU0sQ0FBQSxDQUFHLENBQUE7QUFDbEUsS0FBVyxDQUFBLEVBQUE7O0tBRU4sb0JBQUMsR0FBRyxFQUFBLENBQUEsQ0FBQyxFQUFBLEVBQUUsQ0FBRSxFQUFFLEVBQUMsQ0FBQyxFQUFBLEVBQUUsQ0FBRSxDQUFFLENBQUUsQ0FBQSxFQUFBO01BQ3BCLG9CQUFDLFdBQVcsRUFBQSxJQUFBLENBQUcsQ0FBQTtBQUNyQixLQUFXLENBQUE7O0FBRVgsSUFBVSxDQUFBLEVBQUE7O0lBRU4sb0JBQUMsTUFBTSxFQUFBLElBQUEsQ0FBRyxDQUFBO0dBQ0osQ0FBQTtJQUNOO0FBQ0osRUFBRTs7Q0FFRCxDQUFDLENBQUM7QUFDSCxNQUFNLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQzs7QUNsRXZCLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUNqQyxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUM7QUFDdEMsSUFBSSxhQUFhLEdBQUcsT0FBTyxDQUFDLDZCQUE2QixDQUFDLENBQUM7QUFDM0Q7QUFDQTs7QUFFQSxJQUFJLFNBQVMsR0FBRyxVQUFVOztDQUV6QixJQUFJLFVBQVUsR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUM7QUFDaEQsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxjQUFjLEVBQUUsU0FBUyxFQUFFOztBQUV6RCxDQUFDLElBQUksS0FBSyxHQUFHLFVBQVU7O0FBRXZCLEVBQUUsUUFBUSxHQUFHLFFBQVEsSUFBSSxFQUFFLENBQUM7O0VBRTFCLE1BQU0sS0FBSyxRQUFRLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQztBQUNsQyxFQUFFLFNBQVMsSUFBSSxRQUFRLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQzs7RUFFckMsUUFBUSxDQUFDLEtBQUssT0FBTyxVQUFVLEVBQUUsQ0FBQztFQUNsQyxTQUFTLENBQUMsUUFBUSxNQUFNLFNBQVMsRUFBRSxDQUFDO0VBQ3BDLFNBQVMsQ0FBQyxVQUFVLEtBQUssZ0JBQWdCLEVBQUUsQ0FBQztBQUM5QyxFQUFFLENBQUM7O0FBRUgsQ0FBQyxJQUFJLFVBQVUsR0FBRyxVQUFVOztFQUUxQixNQUFNLEdBQUcsQ0FBQyxRQUFRLENBQUMsS0FBSyxJQUFJLEVBQUUsRUFBRSxNQUFNLENBQUMsU0FBUyxHQUFHLEVBQUUsR0FBRyxDQUFDO0dBQ3hELEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsR0FBRyxDQUFDO0dBQ3JCLE9BQU8sR0FBRyxDQUFDO0dBQ1gsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUNULEVBQUUsQ0FBQztBQUNIO0FBQ0E7O0NBRUMsSUFBSSxTQUFTLEdBQUcsVUFBVTtFQUN6QixVQUFVLEdBQUcsU0FBUyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO0dBQzNDLE1BQU0sQ0FBQyxTQUFTLEdBQUcsRUFBRSxHQUFHLENBQUM7QUFDNUIsR0FBRyxJQUFJLFVBQVUsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDOztHQUVoQyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUU7SUFDOUUsR0FBRyxDQUFDLElBQUksQ0FBQztLQUNSLElBQUksRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDO0tBQ25CLElBQUksRUFBRSxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQzdCLENBQUMsQ0FBQztBQUNQLElBQUk7O0dBRUQsT0FBTyxHQUFHLENBQUM7R0FDWCxDQUFDLEVBQUUsQ0FBQztHQUNKLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7R0FDbEIsR0FBRyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDbEIsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUNWLE1BQU0sR0FBRyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUU7SUFDMUIsT0FBTyxDQUFDLENBQUM7SUFDVDtHQUNELE9BQU8sQ0FBQyxDQUFDO0dBQ1QsQ0FBQyxDQUFDO0FBQ0wsRUFBRSxDQUFDOztDQUVGLElBQUksZ0JBQWdCLEdBQUcsVUFBVTtFQUNoQyxjQUFjLEdBQUcsU0FBUyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLFNBQVMsR0FBRyxFQUFFLEdBQUcsQ0FBQztHQUMzRSxJQUFJLFVBQVUsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0dBQ2hDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7R0FDM0MsT0FBTyxHQUFHLENBQUM7R0FDWCxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ1IsRUFBRTtBQUNGOztDQUVDLElBQUksZUFBZSxHQUFHLFVBQVU7RUFDL0IsT0FBTztHQUNOLEtBQUssTUFBTSxNQUFNO0dBQ2pCLGFBQWEsSUFBSSxjQUFjO0dBQy9CLEtBQUssTUFBTTtJQUNWLElBQUksR0FBRztLQUNOLE9BQU8sR0FBRyxTQUFTLENBQUMsZ0JBQWdCO0tBQ3BDO0lBQ0Q7R0FDRCxDQUFDO0FBQ0osRUFBRSxDQUFDOztDQUVGLFNBQVMsR0FBRyxVQUFVO0VBQ3JCLE9BQU8sTUFBTSxDQUFDO0FBQ2hCLEVBQUUsQ0FBQzs7Q0FFRixRQUFRLEdBQUcsVUFBVTtFQUNwQixPQUFPLFVBQVUsQ0FBQztBQUNwQixFQUFFO0FBQ0Y7O0FBRUEsQ0FBQyxLQUFLLEVBQUUsQ0FBQzs7Q0FFUixPQUFPO0VBQ04sUUFBUSxLQUFLLFNBQVM7RUFDdEIsT0FBTyxLQUFLLFFBQVE7RUFDcEIsY0FBYyxHQUFHLGVBQWU7RUFDaEMsQ0FBQztBQUNILENBQUMsQ0FBQztBQUNGOztBQUVBLGFBQWEsQ0FBQyxRQUFRLENBQUMsU0FBUyxNQUFNLEVBQUU7O0FBRXhDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsRUFBRSxNQUFNLENBQUMsQ0FBQzs7QUFFL0MsQ0FBQyxDQUFDLENBQUM7QUFDSDs7QUFFQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsQ0FBQzs7QUN4RzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMVNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUN0T0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNoREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIEFwcERpc3BhdGNoZXIgPSByZXF1aXJlKCcuLi9kaXNwYXRjaGVyL0FwcERpc3BhdGNoZXIuanMnKTtcclxuXHJcblxyXG52YXIgQmxvZ0FjdGlvbnMgPSB7XHJcblxyXG5cclxuXHRkb0FjdGlvbjogZnVuY3Rpb24odGV4dCkge1xyXG5cclxuXHRcdEFwcERpc3BhdGNoZXIuZGlzcGF0Y2goe1xyXG5cdFx0ICBhY3Rpb25UeXBlOiBcIlNPTUVfQUNUSU9OX1RZUEVcIixcclxuXHRcdCAgdGV4dDogdGV4dFxyXG5cdFx0fSk7XHJcblx0fSxcclxuXHJcblxyXG59XHJcblxyXG5cclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEJsb2dBY3Rpb25zO1xyXG4iLCJ2YXIgSW5kZXhQYWdlID0gcmVxdWlyZSgnLi9wYWdlcy9pbmRleC5qcycpO1xyXG52YXIgQ29udGFjdFBhZ2UgPSByZXF1aXJlKCcuL3BhZ2VzL2NvbnRhY3QuanMnKTtcclxuXHJcbi8vIG5vdCB1c2luZyBhbiBFUzYgdHJhbnNwaWxlclxyXG52YXIgUm91dGVyID0gUmVhY3RSb3V0ZXIuUm91dGVyO1xyXG52YXIgUm91dGUgPSBSZWFjdFJvdXRlci5Sb3V0ZTtcclxudmFyIExpbmsgPSBSZWFjdFJvdXRlci5MaW5rO1xyXG52YXIgYnJvd3Nlckhpc3RvcnkgPSBSZWFjdFJvdXRlci5icm93c2VySGlzdG9yeTtcclxuXHJcblxyXG5cclxuXHJcbiAgUmVhY3RET00ucmVuZGVyKFxyXG5cdCAgPFJvdXRlciBoaXN0b3J5PXticm93c2VySGlzdG9yeX0+XHJcblx0ICAgICAgPFJvdXRlIHBhdGg9XCJjb250YWN0XCIgY29tcG9uZW50PXtDb250YWN0UGFnZX0+PC9Sb3V0ZT5cclxuXHJcblx0ICAgICAgPFJvdXRlIHBhdGg9XCIqXCIgY29tcG9uZW50PXtJbmRleFBhZ2V9PjwvUm91dGU+XHJcblx0ICAgIDwvUm91dGVyPixcclxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVhY3QtYXBwJylcclxuKTtcclxuIiwiLypCb290c3RyYXAgQ2xhc3NlcyovXHJcbnZhciBHcmlkID0gUmVhY3RCb290c3RyYXAuR3JpZDtcclxudmFyIFJvdyA9IFJlYWN0Qm9vdHN0cmFwLlJvdztcclxudmFyIENvbCA9IFJlYWN0Qm9vdHN0cmFwLkNvbDtcclxuXHJcblxyXG52YXIgc2FuaXRpemVQb3N0Q29udGVudCA9IGZ1bmN0aW9uKHN0YXRlKXtcclxuXHR2YXIgY29udGVudCA9IHN0YXRlLmNvbnRlbnQ7XHJcblxyXG5cdGlmKCBzdGF0ZS5pc1RlYXNlciApIHtcclxuXHRcdGltZ19zdHJpbmcgPSBcIlwiO1xyXG5cclxuXHRcdHZhciBpbWFnZV9pbmRleCA9IGNvbnRlbnQuaW5kZXhPZihcIjxpbWdcIik7XHJcblxyXG5cdFx0aWYoIGltYWdlX2luZGV4ICE9IC0xICl7XHJcblx0XHRcdC8vYXZlbSBpbWFnaW5lXHJcblx0XHRcdHZhciBlbmRfaW5kZXggPSBjb250ZW50LmluZGV4T2YoXCIvPlwiLCBpbWFnZV9pbmRleCkgKyAyO1xyXG5cclxuXHRcdFx0dmFyIGltZ19zdHJpbmcgPSBjb250ZW50LnN1YnN0cmluZyhpbWFnZV9pbmRleCwgZW5kX2luZGV4KTtcclxuXHJcblx0XHR9XHJcblxyXG5cclxuXHRcdGNvbnRlbnQgPSBjb250ZW50LnJlcGxhY2UoLzwoPzoufFxcbikqPz4vZ20sICcnKTtcclxuXHJcblx0XHRjb250ZW50ICs9IGltZ19zdHJpbmc7XHJcblxyXG5cdFx0aWYoIGNvbnRlbnQubGVuZ3RoID4gMzAwICkge1xyXG5cdFx0XHRjb250ZW50ID0gY29udGVudC5zdWJzdHIoMCwzMDApO1xyXG5cdFx0XHRjb250ZW50ICs9ICcgPGEgaHJlZj1cIiNcIj5bcmVhZCBtb3JlXTwvYT4nO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cmV0dXJuIHtcclxuXHRcdF9faHRtbCA6IGNvbnRlbnRcclxuXHR9XHJcbn1cclxuXHJcblxyXG5cclxudmFyIEJsb2dQb3N0ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cdGNvbnRleHRUeXBlczoge1xyXG4gICAgXHRtZWRpYVx0XHRcdDogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcclxuXHRcdHRhZ19jb2xvcl9tYXBcdDogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcclxuXHRcdHRleHRzXHRcdFx0OiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0XHJcblx0fSxcclxuXHJcblx0Z2V0SW5pdGlhbFN0YXRlIDogZnVuY3Rpb24oKXtcclxuXHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHR0aXRsZSA6IHRoaXMucHJvcHMucG9zdERhdGEuaGVhZGxpbmUgfHwgJycsXHJcblx0XHRcdG1ldGEgOiB0aGlzLnByb3BzLnBvc3REYXRhLmNyZWF0ZWQgfHwgJycsXHJcblx0XHRcdGNvbnRlbnQ6IHRoaXMucHJvcHMucG9zdERhdGEuYm9keSB8fCAnJyxcclxuXHRcdFx0dGFnczogdGhpcy5wcm9wcy5wb3N0RGF0YS50YWdzIHx8IFtdLFxyXG5cdFx0XHRwcmltYXJ5X2ltYWdlIDogdGhpcy5wcm9wcy5wb3N0RGF0YS5wcmltYXJ5X2ltYWdlX2lkID8gdGhpcy5jb250ZXh0Lm1lZGlhWyB0aGlzLnByb3BzLnBvc3REYXRhLnByaW1hcnlfaW1hZ2VfaWQgIF0gOiBmYWxzZSxcclxuXHRcdFx0aXNUZWFzZXI6IHRoaXMucHJvcHMuaXNUZWFzZXJcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHRyZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG5cdFx0dmFyIGNvbnRleHQgPSB0aGlzLmNvbnRleHQ7XHJcblxyXG5cclxuXHRcdHJldHVybiAoXHJcblxyXG5cdFx0XHQ8YXJ0aWNsZSBjbGFzc05hbWU9XCJibG9nLXBvc3RcIj5cclxuXHJcblxyXG5cdFx0XHRcdDxoMj57dGhpcy5zdGF0ZS50aXRsZX08L2gyPlxyXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicG9zdC1tZXRhXCI+e3RoaXMuc3RhdGUubWV0YX08L2Rpdj5cclxuXHJcblx0XHRcdFx0eyB0aGlzLnN0YXRlLnByaW1hcnlfaW1hZ2UgP1xyXG5cdFx0XHRcdFx0KDxmaWd1cmUgPlxyXG5cdFx0XHRcdFx0XHQ8aW1nIHNyYz17XCIvXCIgKyB0aGlzLnN0YXRlLnByaW1hcnlfaW1hZ2UudXJsfSBhbHQ9e3RoaXMuc3RhdGUucHJpbWFyeV9pbWFnZS5vcmlnaW5hbF9uYW1lfSAvPlxyXG5cdFx0XHRcdFx0PC9maWd1cmU+KTpcclxuXHRcdFx0XHRcdG51bGxcclxuXHRcdFx0XHR9XHJcblxyXG5cclxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInBvc3QtY29udGVudFwiIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXtzYW5pdGl6ZVBvc3RDb250ZW50KCB0aGlzLnN0YXRlICl9IC8+XHJcblxyXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicG9zdC1idXR0b25zXCI+XHJcblx0XHRcdFx0XHQ8YSBjbGFzc05hbWU9XCJmdWxsLXBvc3RcIiBocmVmPVwiI1wiPlxyXG5cdFx0XHRcdFx0XHQ8aSBjbGFzc05hbWU9XCJmYSBmYS1hbGlnbi1qdXN0aWZ5XCI+PC9pPlxyXG5cdFx0XHRcdFx0XHRWaWV3IGZ1bGwgYXJ0aWNsZVxyXG5cdFx0XHRcdFx0PC9hPlxyXG5cdFx0XHRcdFx0PGEgY2xhc3NOYW1lPVwicG9zdC1jb21tZW50cy1idXR0b25cIiBocmVmPVwiI1wiPlxyXG5cdFx0XHRcdFx0XHQ8aSBjbGFzc05hbWU9XCJmYSBmYS1jb21tZW50cy1vXCI+PC9pPlxyXG5cdFx0XHRcdFx0XHRTZWUgY29tbWVudHNcclxuXHRcdFx0XHRcdDwvYT5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHJcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJwb3N0LXRhZ3NcIj5cclxuXHRcdFx0XHRcdHt0aGlzLnN0YXRlLnRhZ3MubWFwKGZ1bmN0aW9uKHRhZywgaSl7XHJcblx0XHRcdFx0XHRcdHJldHVybiA8YSBocmVmPVwiI1wiIGNsYXNzTmFtZT17Y29udGV4dC50YWdfY29sb3JfbWFwW3RhZ10gfHwgJyd9IGtleT17aX0gPnt0YWd9PC9hPlxyXG5cdFx0XHRcdFx0fSl9XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdDwvYXJ0aWNsZT5cclxuXHRcdCk7XHJcblx0fVxyXG5cclxufSk7XHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBCbG9nUG9zdDtcclxuIiwiLypCb290c3RyYXAgQ2xhc3NlcyovXHJcbnZhciBHcmlkID0gUmVhY3RCb290c3RyYXAuR3JpZDtcclxudmFyIFJvdyA9IFJlYWN0Qm9vdHN0cmFwLlJvdztcclxudmFyIENvbCA9IFJlYWN0Qm9vdHN0cmFwLkNvbDtcclxuXHJcblxyXG52YXIgQmxvZ1Bvc3QgPSByZXF1aXJlKCcuL0Jsb2dQb3N0LmpzJyk7XHJcblxyXG52YXIgQmxvZ0FjdGlvbnMgPSByZXF1aXJlKCcuLi9hY3Rpb25zL0Jsb2dBY3Rpb25zLmpzJyk7XHJcblxyXG5cclxudmFyIEJsb2dSb2xsID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cclxuXHRjb250ZXh0VHlwZXM6IHtcclxuICAgIFx0bWVkaWFcdFx0XHQ6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXHJcblx0XHR0YWdfY29sb3JfbWFwXHQ6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsXHJcblx0XHR0ZXh0c1x0XHRcdDogUmVhY3QuUHJvcFR5cGVzLm9iamVjdFxyXG5cdH0sXHJcblxyXG5cdGNoaWxkQ29udGV4dFR5cGVzIDoge1xyXG4gICAgXHRtZWRpYVx0XHRcdDogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcclxuXHRcdHRhZ19jb2xvcl9tYXBcdDogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCxcclxuXHRcdHRleHRzXHRcdFx0OiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0XHJcbiAgICB9LFxyXG5cclxuXHRnZXRDaGlsZENvbnRleHQgOiBmdW5jdGlvbigpe1xyXG5cdFx0cmV0dXJuIHRoaXMuY29udGV4dDtcclxuXHR9LFxyXG5cclxuXHRnZXRJbml0aWFsU3RhdGUgOiBmdW5jdGlvbigpe1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0cG9zdHNcdDogdGhpcy5wcm9wcy5wb3N0cyxcclxuXHRcdFx0dGFnc1x0OiB0aGlzLnByb3BzLnRhZ3NcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHRyZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdHZhciBwb3N0cyBcdFx0PSB0aGlzLnN0YXRlLnBvc3RzO1xyXG5cdFx0dmFyIHRhZ3NcdFx0PSB0aGlzLnN0YXRlLnRhZ3M7XHJcblx0XHR2YXIgY29udGV4dCBcdD0gdGhpcy5jb250ZXh0O1xyXG5cclxuXHJcblxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PFJvdyBjbGFzc05hbWU9XCJibG9nLXJvbGxcIj5cclxuXHJcblx0XHRcdFx0PENvbCB4cz17MTJ9PlxyXG5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwidGFnc1wiPlxyXG5cdFx0XHRcdFx0XHQ8aDU+TWFpbiB0YWdzOjwvaDU+XHJcblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwidGFncy13cmFwcGVyXCI+XHJcblx0XHRcdFx0XHRcdFx0e3RhZ3MubWFwKGZ1bmN0aW9uKHRhZywgaSl7XHJcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gPGEgY2xhc3NOYW1lPXtcInRhZy1idXR0b24gXCIgKyAoY29udGV4dC50YWdfY29sb3JfbWFwW3RhZy5uYW1lXSB8fCAnJyl9ICBocmVmPVwiI1wiIGtleT17aX0+e3RhZy5uYW1lfTwvYT5cclxuXHRcdFx0XHRcdFx0XHR9KX1cclxuXHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInBvc3QtbGlzdFwiPlxyXG5cdFx0XHRcdFx0XHR7cG9zdHMubWFwKGZ1bmN0aW9uKHBvc3Qpe1xyXG5cdFx0XHRcdFx0XHRcdHJldHVybiA8QmxvZ1Bvc3Qga2V5PXtwb3N0Ll9pZH0gcG9zdERhdGE9e3Bvc3R9IGlzVGVhc2VyPXt0cnVlfSAvPlxyXG5cdFx0XHRcdFx0XHR9KX1cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibG9hZC1tb3JlXCI+XHJcblx0XHRcdFx0XHRcdDxhIGhyZWY9XCJcIiBvbkNsaWNrPXt0aGlzLl9sb2FkTW9yZX0gY2xhc3NOYW1lPVwibG9hZC1tb3JlLWJ1dHRvbiBcIj5cclxuXHRcdFx0XHRcdFx0XHQ8aSBjbGFzc05hbWU9XCJmYSAgZmEtcmVmcmVzaFwiPjwvaT5cclxuXHRcdFx0XHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJhY3RpdmUtbGFiZWxcIj5Mb2FkaW5nLi4uPC9zcGFuPlxyXG5cdFx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cInBhc3NpdmUtbGFiZWxcIj5Mb2FkIG1vcmU8L3NwYW4+XHJcblx0XHRcdFx0XHRcdDwvYT5cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cclxuXHJcblxyXG5cdFx0XHRcdDwvQ29sPlxyXG5cdFx0XHQ8L1Jvdz5cclxuXHRcdCk7XHJcblx0fSxcclxuXHJcblxyXG5cdF9sb2FkTW9yZSA6IGZ1bmN0aW9uKGV2dCl7XHJcblx0XHRldnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdGNvbnNvbGUubG9nKCdkb2luZyBhY3Rpb24nKTtcclxuXHJcblx0XHRCbG9nQWN0aW9ucy5kb0FjdGlvbihcInBhc3NlZCB0ZXh0IGZyb20gYmxvZ1JvbGxcIik7XHJcblx0fVxyXG59KTtcclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEJsb2dSb2xsO1xyXG4iLCIvKkJvb3RzdHJhcCBDbGFzc2VzKi9cclxudmFyIEdyaWQgPSBSZWFjdEJvb3RzdHJhcC5HcmlkO1xyXG52YXIgUm93ID0gUmVhY3RCb290c3RyYXAuUm93O1xyXG52YXIgQ29sID0gUmVhY3RCb290c3RyYXAuQ29sO1xyXG5cclxuXHJcbnZhciBGb290ZXIgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblxyXG5cdHJlbmRlcjogZnVuY3Rpb24oKSB7XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8Um93IGNsYXNzTmFtZT1cImZvb3RlclwiPlxyXG5cdFx0XHRcdENvcHlyaWdodCAmY29weTsgQGJlbmkgJiBATHVtaVxyXG5cdFx0XHQ8L1Jvdz5cclxuXHRcdCk7XHJcblx0fVxyXG5cclxufSk7XHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBGb290ZXI7XHJcbiIsIi8qQm9vdHN0cmFwIENsYXNzZXMqL1xyXG52YXIgR3JpZCA9IFJlYWN0Qm9vdHN0cmFwLkdyaWQ7XHJcbnZhciBSb3cgPSBSZWFjdEJvb3RzdHJhcC5Sb3c7XHJcbnZhciBDb2wgPSBSZWFjdEJvb3RzdHJhcC5Db2w7XHJcblxyXG5cclxudmFyIEhlYWRlciA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHJcblx0cmVuZGVyOiBmdW5jdGlvbigpIHtcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxSb3cgY2xhc3NOYW1lPVwiaGVhZGVyXCI+XHJcblx0XHRcdFx0PENvbCB4cz17Nn0gPlxyXG5cdFx0XHRcdFx0PGEgY2xhc3NOYW1lPVwibG9nby13cmFwcGVyXCIgaHJlZj1cIi9cIj5cclxuXHRcdFx0XHRcdFx0PGltZyBzcmM9XCIvcmVzL3dlYi9pbWcvbG9nby5wbmdcIiAvPlxyXG5cdFx0XHRcdFx0PC9hPlxyXG5cdFx0XHRcdDwvQ29sPlxyXG5cdFx0XHRcdDxDb2wgeHM9ezZ9PlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJoZWFkZXItYnV0dG9ucyBwdWxsLXJpZ2h0XCI+XHJcblx0XHRcdFx0XHRcdDxhIGhyZWY9XCIjXCIgY2xhc3NOYW1lPVwibG9naW4gaGVhZGVyLWJ1dHRvblwiID5cclxuXHRcdFx0XHRcdFx0XHQ8aSBjbGFzc05hbWU9XCJmYSBmYS11c2VyXCIgLz5cclxuXHRcdFx0XHRcdFx0PC9hPlxyXG5cdFx0XHRcdFx0XHQ8YSBocmVmPVwiI1wiIGNsYXNzTmFtZT1cImNvbnRhY3QgaGVhZGVyLWJ1dHRvblwiID5cclxuXHRcdFx0XHRcdFx0XHQ8aSBjbGFzc05hbWU9XCJmYSBmYS1lbnZlbG9wZS1vXCIgLz5cclxuXHRcdFx0XHRcdFx0PC9hPlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PC9Db2w+XHJcblx0XHRcdDwvUm93PlxyXG5cdFx0KTtcclxuXHR9XHJcblxyXG59KTtcclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEhlYWRlcjtcclxuIiwiLypCb290c3RyYXAgQ2xhc3NlcyovXHJcbnZhciBHcmlkID0gUmVhY3RCb290c3RyYXAuR3JpZDtcclxudmFyIFJvdyA9IFJlYWN0Qm9vdHN0cmFwLlJvdztcclxudmFyIENvbCA9IFJlYWN0Qm9vdHN0cmFwLkNvbDtcclxuXHJcblxyXG52YXIgU3VnZ2VzdGlvbnMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblxyXG5cdHJlbmRlcjogZnVuY3Rpb24oKSB7XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInN1Z2dlc3Rpb25zXCI+XHJcblxyXG5cclxuXHRcdFx0XHQ8aDM+TW9zdCByZWxldmFudCBwb3N0czwvaDM+XHJcblxyXG5cdFx0XHRcdDxoND5Qcm9ncmFtbWluZzo8L2g0PlxyXG5cdFx0XHRcdDxhIGhyZWY9XCIjXCI+U2NyaXB0IE1hc3RlciByYWNlIGFydGljbGUgPC9hPlxyXG5cdFx0XHRcdDxhIGhyZWY9XCIjXCI+TW9lciBQcm9ncmFtbWluZyBzdHVmZiE8L2E+XHJcblx0XHRcdFx0PGEgaHJlZj1cIiNcIj5UbyBwcm9ncmFtIG9yIG5vdCB0byBwcm9ncmFtPyB0aGlzIGlzIHRoZSBxdWVzdGlvbiEgPC9hPlxyXG5cdFx0XHRcdDxhIGhyZWY9XCIjXCI+T2JsaWdhdG9yeSBMdW1pc29yICBwb3N0PC9hPlxyXG5cclxuXHRcdFx0XHQ8aDQ+SmF2YXNjcmlwdDo8L2g0PlxyXG5cclxuXHRcdFx0XHQ8YSBocmVmPVwiI1wiPklzIEphdmFzY3JpcHQgcmVhbGx5IHRoYXQgZ3JlYXQ/PC9hPlxyXG5cdFx0XHRcdDxhIGhyZWY9XCIjXCI+V2hhdCBpZiBub3Q/PC9hPlxyXG5cdFx0XHRcdDxhIGhyZWY9XCIjXCI+V2hhdCBKYXZhc2NyaXB0IGlzIGFuZCB3aGF0IGphdmFzY3JpcHQgaXMgbm90PC9hPlxyXG5cdFx0XHRcdDxhIGhyZWY9XCIjXCI+TW9yZSBsdW1pc29yICBvZmM8L2E+XHJcblx0XHRcdFx0PGEgaHJlZj1cIiNcIj5UaGVyZSBpcyBubyBKYXZhc2NyaXB0IG9ubHkgPC9hPlxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdCk7XHJcblx0fVxyXG5cclxufSk7XHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBTdWdnZXN0aW9ucztcclxuIiwiXHJcbi8qXHJcbiAqIENvcHlyaWdodCAoYykgMjAxNC0yMDE1LCBGYWNlYm9vaywgSW5jLlxyXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4gKlxyXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcclxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XHJcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxyXG4gKlxyXG4gKiBBcHBEaXNwYXRjaGVyXHJcbiAqXHJcbiAqIEEgc2luZ2xldG9uIHRoYXQgb3BlcmF0ZXMgYXMgdGhlIGNlbnRyYWwgaHViIGZvciBhcHBsaWNhdGlvbiB1cGRhdGVzLlxyXG4gKi9cclxuXHJcbnZhciBEaXNwYXRjaGVyID0gcmVxdWlyZSgnZmx1eCcpLkRpc3BhdGNoZXI7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBEaXNwYXRjaGVyKCk7XHJcbiIsIlxyXG52YXIgdmFyaWFibGVQYXNzZWQgPSAwO1xyXG5cclxuXHJcblxyXG52YXIgQ29udGFjdCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHRnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xyXG5cdFx0cmV0dXJuIHt2YXJpYWJsZVBhc3NlZDogMX07XHJcblx0fSxcclxuXHJcblx0Y29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uKCkge1xyXG5cdFx0dmFyIHNlbGYgPSB0aGlzO1xyXG5cclxuXHRcdHNldEludGVydmFsKGZ1bmN0aW9uKCl7XHJcblxyXG5cdFx0XHR2YXIgc3RhdGUgPSBzZWxmLnN0YXRlO1xyXG5cclxuXHRcdFx0c3RhdGUudmFyaWFibGVQYXNzZWQrKztcclxuXHRcdFx0c2VsZi5zZXRTdGF0ZShzdGF0ZSk7XHJcblx0XHR9LCAxMDAwKTtcclxuXHR9LFxyXG5cclxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIChcclxuXHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiQ29udGFjdFwiPiBkc2Fkc2FcclxuICAgICAgICBIZWxsbywgd29ybGQhIFRoaXMgaXMgdGhlIGNvbnRhY3QgcGFnZSwgbmV4dCBpcyB0aGUgY29tbWVudCBib3g6XHJcblxyXG4gICAgICA8L2Rpdj5cclxuICAgICk7XHJcbiAgfVxyXG5cclxufSk7XHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBDb250YWN0O1xyXG4iLCIvKkJvb3RzdHJhcCBDbGFzc2VzKi9cclxudmFyIEdyaWQgPSBSZWFjdEJvb3RzdHJhcC5HcmlkO1xyXG52YXIgUm93ID0gUmVhY3RCb290c3RyYXAuUm93O1xyXG52YXIgQ29sID0gUmVhY3RCb290c3RyYXAuQ29sO1xyXG5cclxuLypDb21wb25lbnRzKi9cclxudmFyIEhlYWRlciA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvSGVhZGVyLmpzJyk7XHJcbnZhciBCbG9nUm9sbCA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvQmxvZ1JvbGwuanMnKTtcclxudmFyIFN1Z2dlc3Rpb25zID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9TdWdnZXN0aW9ucy5qcycpO1xyXG52YXIgRm9vdGVyID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9Gb290ZXIuanMnKTtcclxuXHJcblxyXG4vKlN0b3JlcyovXHJcbnZhciBibG9nX3N0b3JlID0gcmVxdWlyZSgnLi4vc3RvcmVzL0Jsb2dTdG9yZS5qcycpKCk7XHJcblxyXG4vKmNvbnRleHQqL1xyXG52YXIgcm9vdF9jb250ZXh0ID0gYmxvZ19zdG9yZS5nZXRIb21lQ29udGV4dCgpO1xyXG5cclxuXHJcbnZhciBJbmRleCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHJcblx0Y2hpbGRDb250ZXh0VHlwZXMgOiB7XHJcbiAgICBcdG1lZGlhXHRcdFx0OiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxyXG5cdFx0dGFnX2NvbG9yX21hcFx0OiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxyXG5cdFx0dGV4dHNcdFx0XHQ6IFJlYWN0LlByb3BUeXBlcy5vYmplY3RcclxuICAgIH0sXHJcblxyXG5cdGdldENoaWxkQ29udGV4dCA6IGZ1bmN0aW9uKCl7XHJcblx0XHRyZXR1cm4gcm9vdF9jb250ZXh0O1xyXG5cdH0sXHJcblxyXG5cclxuXHRnZXRJbml0aWFsU3RhdGUgOiBmdW5jdGlvbigpe1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0cG9zdHM6IGJsb2dfc3RvcmUuZ2V0UG9zdHMoKSxcclxuXHRcdFx0dGFncyA6IGJsb2dfc3RvcmUuZ2V0VGFncygpXHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0cmVuZGVyOiBmdW5jdGlvbigpIHtcclxuXHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8R3JpZD5cclxuXHRcdFx0XHQ8SGVhZGVyIC8+XHJcblxyXG5cdFx0XHRcdDxSb3cgY2xhc3NOYW1lPVwibWFpbi1jb250YWluZXJcIj5cclxuXHRcdFx0XHRcdDxDb2wgeHM9ezEyfSA+XHJcblx0XHRcdFx0XHRcdDxoMSBjbGFzc05hbWU9XCJtYWluLXRpdGxlXCI+e3Jvb3RfY29udGV4dC50ZXh0cy5ob21lLnRhZ2xpbmV9PC9oMT5cclxuXHRcdFx0XHRcdDwvQ29sPlxyXG5cclxuXHRcdFx0XHRcdDxDb2wgeHM9ezEyfSBtZD17OX0gPlxyXG5cdFx0XHRcdFx0XHQ8QmxvZ1JvbGwgdGFncz17dGhpcy5zdGF0ZS50YWdzfSBwb3N0cz17dGhpcy5zdGF0ZS5wb3N0c30gLz5cclxuXHRcdFx0XHRcdDwvQ29sPlxyXG5cclxuXHRcdFx0XHRcdDxDb2wgeHM9ezEyfSBtZD17M30gPlxyXG5cdFx0XHRcdFx0XHQ8U3VnZ2VzdGlvbnMgLz5cclxuXHRcdFx0XHRcdDwvQ29sPlxyXG5cclxuXHRcdFx0XHQ8L1Jvdz5cclxuXHJcblx0XHRcdFx0PEZvb3RlciAvPlxyXG5cdFx0XHQ8L0dyaWQ+XHJcblx0XHQpO1xyXG5cdH1cclxuXHJcbn0pO1xyXG5tb2R1bGUuZXhwb3J0cyA9IEluZGV4O1xyXG4iLCJjb25zdCBFdmVudHMgPSByZXF1aXJlKCdldmVudHMnKTtcclxudmFyIGFzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcclxudmFyIEFwcERpc3BhdGNoZXIgPSByZXF1aXJlKCcuLi9kaXNwYXRjaGVyL0FwcERpc3BhdGNoZXInKTtcclxuXHJcblxyXG5cclxudmFyIEJsb2dTdG9yZSA9IGZ1bmN0aW9uKCl7XHJcblxyXG5cdHZhciBfZXZlbnRfYnVzID0gYXNzaWduKHt9LEV2ZW50cy5ldmVudEVtaXR0ZXIpLFxyXG5cdFx0X3Bvc3RzLCBfbWVkaWEsIF9wcmlvX3RhZ3MsIF90YWdfY29sb3JfbWFwLCBfc2V0dGluZ3MgO1xyXG5cclxuXHR2YXIgX2luaXQgPSBmdW5jdGlvbigpe1xyXG5cdFx0Ly9kbyBpbml0XHJcblx0XHRwYWdlRGF0YSA9IHBhZ2VEYXRhIHx8IHt9O1xyXG5cclxuXHRcdF9wb3N0cyBcdFx0PSBwYWdlRGF0YS5wb3N0cyB8fCBbXTtcclxuXHRcdF9zZXR0aW5ncyBcdD0gcGFnZURhdGEuc2V0dGluZ3MgfHwge307XHJcblxyXG5cdFx0cGFnZURhdGEubWVkaWEgXHRcdFx0JiYgX2luaXRNZWRpYSgpO1xyXG5cdFx0X3NldHRpbmdzLnRhZ19wcmlvIFx0XHQmJiBfaW5pdFRhZ3MoKTtcclxuXHRcdF9zZXR0aW5ncy50YWdfY29sb3JzIFx0JiYgX2luaXRUYWdDb2xvck1hcCgpO1xyXG5cdH07XHJcblxyXG5cdHZhciBfaW5pdE1lZGlhID0gZnVuY3Rpb24oKXtcclxuXHRcdC8vIG1hcCBhbGwgdGhlIG1lZGlhIGZpbGVzIGludG8gbWVkaWEuaWQsIGZvciBlYXNlIG9mIGV4dHJhY3Rpb25cclxuXHRcdF9tZWRpYSA9IChwYWdlRGF0YS5tZWRpYSB8fCBbXSkucmVkdWNlKGZ1bmN0aW9uKGFjYywgY3J0KXtcclxuXHRcdFx0YWNjWyBjcnQuX2lkIF0gPSBjcnQ7XHJcblx0XHRcdHJldHVybiBhY2M7XHJcblx0XHR9LCB7fSk7XHJcblx0fTtcclxuXHJcblxyXG5cclxuXHR2YXIgX2luaXRUYWdzID0gZnVuY3Rpb24oKXtcclxuXHRcdF9wcmlvX3RhZ3MgPSBfc2V0dGluZ3MudGFnX3ByaW8uc3BsaXQoXCI8fD5cIilcclxuXHRcdC5yZWR1Y2UoZnVuY3Rpb24oYWNjLCBjcnQpe1xyXG5cdFx0XHR2YXIgY29tcG9uZW50cyA9IGNydC5zcGxpdChcIn5cIik7XHJcblxyXG5cdFx0XHRpZiAocGFnZURhdGEudGFncy5pbmRleE9mKGNvbXBvbmVudHNbMF0pICE9IC0xICYmIHBhcnNlSW50KGNvbXBvbmVudHNbMV0pID4gMCApe1xyXG5cdFx0XHRcdGFjYy5wdXNoKHtcclxuXHRcdFx0XHRcdG5hbWU6IGNvbXBvbmVudHNbMF0sXHJcblx0XHRcdFx0XHRwcmlvOiBwYXJzZUludChjb21wb25lbnRzWzFdKVxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gYWNjO1xyXG5cdFx0fSxbXSlcclxuXHRcdC5zb3J0KGZ1bmN0aW9uKGEsYil7XHJcblx0XHRcdGlmKGEucHJpbyA8IGIucHJpbyl7XHJcblx0XHRcdFx0cmV0dXJuIC0xO1xyXG5cdFx0XHR9IGVsc2UgaWYoYS5wcmlvID4gYi5wcmlvKSB7XHJcblx0XHRcdFx0cmV0dXJuIDE7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIDA7XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHR2YXIgX2luaXRUYWdDb2xvck1hcCA9IGZ1bmN0aW9uKCl7XHJcblx0XHRfdGFnX2NvbG9yX21hcCA9IF9zZXR0aW5ncy50YWdfY29sb3JzLnNwbGl0KFwiPHw+XCIpLnJlZHVjZShmdW5jdGlvbihhY2MsIGNydCl7XHJcblx0XHRcdHZhciBjb21wb25lbnRzID0gY3J0LnNwbGl0KFwiflwiKTtcclxuXHRcdFx0YWNjW2NvbXBvbmVudHNbMF1dID0gKGNvbXBvbmVudHNbMV0gfHwgJycpO1xyXG5cdFx0XHRyZXR1cm4gYWNjO1xyXG5cdFx0fSx7fSk7XHJcblx0fVxyXG5cclxuXHJcblx0dmFyIF9nZXRIb21lQ29udGV4dCA9IGZ1bmN0aW9uKCl7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRtZWRpYSBcdFx0XHQ6IF9tZWRpYSxcclxuXHRcdFx0dGFnX2NvbG9yX21hcCBcdDogX3RhZ19jb2xvcl9tYXAsXHJcblx0XHRcdHRleHRzIFx0XHRcdDoge1xyXG5cdFx0XHRcdGhvbWUgOiB7XHJcblx0XHRcdFx0XHR0YWdsaW5lIDogX3NldHRpbmdzLmhvbWVwYWdlX3RhZ2xpbmVcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblx0fTtcclxuXHJcblx0X2dldFBvc3RzID0gZnVuY3Rpb24oKXtcclxuXHRcdHJldHVybiBfcG9zdHM7XHJcblx0fTtcclxuXHJcblx0X2dldFRhZ3MgPSBmdW5jdGlvbigpe1xyXG5cdFx0cmV0dXJuIF9wcmlvX3RhZ3M7XHJcblx0fVxyXG5cclxuXHJcblx0X2luaXQoKTtcclxuXHJcblx0cmV0dXJuIHtcclxuXHRcdGdldFBvc3RzIFx0XHQ6IF9nZXRQb3N0cyxcclxuXHRcdGdldFRhZ3MgXHRcdDogX2dldFRhZ3MsXHJcblx0XHRnZXRIb21lQ29udGV4dFx0OiBfZ2V0SG9tZUNvbnRleHRcclxuXHR9O1xyXG59O1xyXG5cclxuXHJcbkFwcERpc3BhdGNoZXIucmVnaXN0ZXIoZnVuY3Rpb24oYWN0aW9uKSB7XHJcblxyXG5cdGNvbnNvbGUubG9nKCdkaXNwYXRjaGVyIGRpc3BhdGNoZWQ6JywgYWN0aW9uKTtcclxuXHJcbn0pO1xyXG5cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQmxvZ1N0b3JlO1xyXG4iLCIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuZnVuY3Rpb24gRXZlbnRFbWl0dGVyKCkge1xuICB0aGlzLl9ldmVudHMgPSB0aGlzLl9ldmVudHMgfHwge307XG4gIHRoaXMuX21heExpc3RlbmVycyA9IHRoaXMuX21heExpc3RlbmVycyB8fCB1bmRlZmluZWQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IEV2ZW50RW1pdHRlcjtcblxuLy8gQmFja3dhcmRzLWNvbXBhdCB3aXRoIG5vZGUgMC4xMC54XG5FdmVudEVtaXR0ZXIuRXZlbnRFbWl0dGVyID0gRXZlbnRFbWl0dGVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9ldmVudHMgPSB1bmRlZmluZWQ7XG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9tYXhMaXN0ZW5lcnMgPSB1bmRlZmluZWQ7XG5cbi8vIEJ5IGRlZmF1bHQgRXZlbnRFbWl0dGVycyB3aWxsIHByaW50IGEgd2FybmluZyBpZiBtb3JlIHRoYW4gMTAgbGlzdGVuZXJzIGFyZVxuLy8gYWRkZWQgdG8gaXQuIFRoaXMgaXMgYSB1c2VmdWwgZGVmYXVsdCB3aGljaCBoZWxwcyBmaW5kaW5nIG1lbW9yeSBsZWFrcy5cbkV2ZW50RW1pdHRlci5kZWZhdWx0TWF4TGlzdGVuZXJzID0gMTA7XG5cbi8vIE9idmlvdXNseSBub3QgYWxsIEVtaXR0ZXJzIHNob3VsZCBiZSBsaW1pdGVkIHRvIDEwLiBUaGlzIGZ1bmN0aW9uIGFsbG93c1xuLy8gdGhhdCB0byBiZSBpbmNyZWFzZWQuIFNldCB0byB6ZXJvIGZvciB1bmxpbWl0ZWQuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnNldE1heExpc3RlbmVycyA9IGZ1bmN0aW9uKG4pIHtcbiAgaWYgKCFpc051bWJlcihuKSB8fCBuIDwgMCB8fCBpc05hTihuKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ24gbXVzdCBiZSBhIHBvc2l0aXZlIG51bWJlcicpO1xuICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSBuO1xuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgdmFyIGVyLCBoYW5kbGVyLCBsZW4sIGFyZ3MsIGksIGxpc3RlbmVycztcblxuICBpZiAoIXRoaXMuX2V2ZW50cylcbiAgICB0aGlzLl9ldmVudHMgPSB7fTtcblxuICAvLyBJZiB0aGVyZSBpcyBubyAnZXJyb3InIGV2ZW50IGxpc3RlbmVyIHRoZW4gdGhyb3cuXG4gIGlmICh0eXBlID09PSAnZXJyb3InKSB7XG4gICAgaWYgKCF0aGlzLl9ldmVudHMuZXJyb3IgfHxcbiAgICAgICAgKGlzT2JqZWN0KHRoaXMuX2V2ZW50cy5lcnJvcikgJiYgIXRoaXMuX2V2ZW50cy5lcnJvci5sZW5ndGgpKSB7XG4gICAgICBlciA9IGFyZ3VtZW50c1sxXTtcbiAgICAgIGlmIChlciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgIHRocm93IGVyOyAvLyBVbmhhbmRsZWQgJ2Vycm9yJyBldmVudFxuICAgICAgfVxuICAgICAgdGhyb3cgVHlwZUVycm9yKCdVbmNhdWdodCwgdW5zcGVjaWZpZWQgXCJlcnJvclwiIGV2ZW50LicpO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZXIgPSB0aGlzLl9ldmVudHNbdHlwZV07XG5cbiAgaWYgKGlzVW5kZWZpbmVkKGhhbmRsZXIpKVxuICAgIHJldHVybiBmYWxzZTtcblxuICBpZiAoaXNGdW5jdGlvbihoYW5kbGVyKSkge1xuICAgIHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgLy8gZmFzdCBjYXNlc1xuICAgICAgY2FzZSAxOlxuICAgICAgICBoYW5kbGVyLmNhbGwodGhpcyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAyOlxuICAgICAgICBoYW5kbGVyLmNhbGwodGhpcywgYXJndW1lbnRzWzFdKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDM6XG4gICAgICAgIGhhbmRsZXIuY2FsbCh0aGlzLCBhcmd1bWVudHNbMV0sIGFyZ3VtZW50c1syXSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgLy8gc2xvd2VyXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgICAgICAgaGFuZGxlci5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoaXNPYmplY3QoaGFuZGxlcikpIHtcbiAgICBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgICBsaXN0ZW5lcnMgPSBoYW5kbGVyLnNsaWNlKCk7XG4gICAgbGVuID0gbGlzdGVuZXJzLmxlbmd0aDtcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspXG4gICAgICBsaXN0ZW5lcnNbaV0uYXBwbHkodGhpcywgYXJncyk7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXIgPSBmdW5jdGlvbih0eXBlLCBsaXN0ZW5lcikge1xuICB2YXIgbTtcblxuICBpZiAoIWlzRnVuY3Rpb24obGlzdGVuZXIpKVxuICAgIHRocm93IFR5cGVFcnJvcignbGlzdGVuZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMpXG4gICAgdGhpcy5fZXZlbnRzID0ge307XG5cbiAgLy8gVG8gYXZvaWQgcmVjdXJzaW9uIGluIHRoZSBjYXNlIHRoYXQgdHlwZSA9PT0gXCJuZXdMaXN0ZW5lclwiISBCZWZvcmVcbiAgLy8gYWRkaW5nIGl0IHRvIHRoZSBsaXN0ZW5lcnMsIGZpcnN0IGVtaXQgXCJuZXdMaXN0ZW5lclwiLlxuICBpZiAodGhpcy5fZXZlbnRzLm5ld0xpc3RlbmVyKVxuICAgIHRoaXMuZW1pdCgnbmV3TGlzdGVuZXInLCB0eXBlLFxuICAgICAgICAgICAgICBpc0Z1bmN0aW9uKGxpc3RlbmVyLmxpc3RlbmVyKSA/XG4gICAgICAgICAgICAgIGxpc3RlbmVyLmxpc3RlbmVyIDogbGlzdGVuZXIpO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzW3R5cGVdKVxuICAgIC8vIE9wdGltaXplIHRoZSBjYXNlIG9mIG9uZSBsaXN0ZW5lci4gRG9uJ3QgbmVlZCB0aGUgZXh0cmEgYXJyYXkgb2JqZWN0LlxuICAgIHRoaXMuX2V2ZW50c1t0eXBlXSA9IGxpc3RlbmVyO1xuICBlbHNlIGlmIChpc09iamVjdCh0aGlzLl9ldmVudHNbdHlwZV0pKVxuICAgIC8vIElmIHdlJ3ZlIGFscmVhZHkgZ290IGFuIGFycmF5LCBqdXN0IGFwcGVuZC5cbiAgICB0aGlzLl9ldmVudHNbdHlwZV0ucHVzaChsaXN0ZW5lcik7XG4gIGVsc2VcbiAgICAvLyBBZGRpbmcgdGhlIHNlY29uZCBlbGVtZW50LCBuZWVkIHRvIGNoYW5nZSB0byBhcnJheS5cbiAgICB0aGlzLl9ldmVudHNbdHlwZV0gPSBbdGhpcy5fZXZlbnRzW3R5cGVdLCBsaXN0ZW5lcl07XG5cbiAgLy8gQ2hlY2sgZm9yIGxpc3RlbmVyIGxlYWtcbiAgaWYgKGlzT2JqZWN0KHRoaXMuX2V2ZW50c1t0eXBlXSkgJiYgIXRoaXMuX2V2ZW50c1t0eXBlXS53YXJuZWQpIHtcbiAgICBpZiAoIWlzVW5kZWZpbmVkKHRoaXMuX21heExpc3RlbmVycykpIHtcbiAgICAgIG0gPSB0aGlzLl9tYXhMaXN0ZW5lcnM7XG4gICAgfSBlbHNlIHtcbiAgICAgIG0gPSBFdmVudEVtaXR0ZXIuZGVmYXVsdE1heExpc3RlbmVycztcbiAgICB9XG5cbiAgICBpZiAobSAmJiBtID4gMCAmJiB0aGlzLl9ldmVudHNbdHlwZV0ubGVuZ3RoID4gbSkge1xuICAgICAgdGhpcy5fZXZlbnRzW3R5cGVdLndhcm5lZCA9IHRydWU7XG4gICAgICBjb25zb2xlLmVycm9yKCcobm9kZSkgd2FybmluZzogcG9zc2libGUgRXZlbnRFbWl0dGVyIG1lbW9yeSAnICtcbiAgICAgICAgICAgICAgICAgICAgJ2xlYWsgZGV0ZWN0ZWQuICVkIGxpc3RlbmVycyBhZGRlZC4gJyArXG4gICAgICAgICAgICAgICAgICAgICdVc2UgZW1pdHRlci5zZXRNYXhMaXN0ZW5lcnMoKSB0byBpbmNyZWFzZSBsaW1pdC4nLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9ldmVudHNbdHlwZV0ubGVuZ3RoKTtcbiAgICAgIGlmICh0eXBlb2YgY29uc29sZS50cmFjZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAvLyBub3Qgc3VwcG9ydGVkIGluIElFIDEwXG4gICAgICAgIGNvbnNvbGUudHJhY2UoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub24gPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbih0eXBlLCBsaXN0ZW5lcikge1xuICBpZiAoIWlzRnVuY3Rpb24obGlzdGVuZXIpKVxuICAgIHRocm93IFR5cGVFcnJvcignbGlzdGVuZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG5cbiAgdmFyIGZpcmVkID0gZmFsc2U7XG5cbiAgZnVuY3Rpb24gZygpIHtcbiAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGcpO1xuXG4gICAgaWYgKCFmaXJlZCkge1xuICAgICAgZmlyZWQgPSB0cnVlO1xuICAgICAgbGlzdGVuZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9XG4gIH1cblxuICBnLmxpc3RlbmVyID0gbGlzdGVuZXI7XG4gIHRoaXMub24odHlwZSwgZyk7XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vLyBlbWl0cyBhICdyZW1vdmVMaXN0ZW5lcicgZXZlbnQgaWZmIHRoZSBsaXN0ZW5lciB3YXMgcmVtb3ZlZFxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lciA9IGZ1bmN0aW9uKHR5cGUsIGxpc3RlbmVyKSB7XG4gIHZhciBsaXN0LCBwb3NpdGlvbiwgbGVuZ3RoLCBpO1xuXG4gIGlmICghaXNGdW5jdGlvbihsaXN0ZW5lcikpXG4gICAgdGhyb3cgVHlwZUVycm9yKCdsaXN0ZW5lciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcblxuICBpZiAoIXRoaXMuX2V2ZW50cyB8fCAhdGhpcy5fZXZlbnRzW3R5cGVdKVxuICAgIHJldHVybiB0aGlzO1xuXG4gIGxpc3QgPSB0aGlzLl9ldmVudHNbdHlwZV07XG4gIGxlbmd0aCA9IGxpc3QubGVuZ3RoO1xuICBwb3NpdGlvbiA9IC0xO1xuXG4gIGlmIChsaXN0ID09PSBsaXN0ZW5lciB8fFxuICAgICAgKGlzRnVuY3Rpb24obGlzdC5saXN0ZW5lcikgJiYgbGlzdC5saXN0ZW5lciA9PT0gbGlzdGVuZXIpKSB7XG4gICAgZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgICBpZiAodGhpcy5fZXZlbnRzLnJlbW92ZUxpc3RlbmVyKVxuICAgICAgdGhpcy5lbWl0KCdyZW1vdmVMaXN0ZW5lcicsIHR5cGUsIGxpc3RlbmVyKTtcblxuICB9IGVsc2UgaWYgKGlzT2JqZWN0KGxpc3QpKSB7XG4gICAgZm9yIChpID0gbGVuZ3RoOyBpLS0gPiAwOykge1xuICAgICAgaWYgKGxpc3RbaV0gPT09IGxpc3RlbmVyIHx8XG4gICAgICAgICAgKGxpc3RbaV0ubGlzdGVuZXIgJiYgbGlzdFtpXS5saXN0ZW5lciA9PT0gbGlzdGVuZXIpKSB7XG4gICAgICAgIHBvc2l0aW9uID0gaTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHBvc2l0aW9uIDwgMClcbiAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgaWYgKGxpc3QubGVuZ3RoID09PSAxKSB7XG4gICAgICBsaXN0Lmxlbmd0aCA9IDA7XG4gICAgICBkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO1xuICAgIH0gZWxzZSB7XG4gICAgICBsaXN0LnNwbGljZShwb3NpdGlvbiwgMSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2V2ZW50cy5yZW1vdmVMaXN0ZW5lcilcbiAgICAgIHRoaXMuZW1pdCgncmVtb3ZlTGlzdGVuZXInLCB0eXBlLCBsaXN0ZW5lcik7XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlQWxsTGlzdGVuZXJzID0gZnVuY3Rpb24odHlwZSkge1xuICB2YXIga2V5LCBsaXN0ZW5lcnM7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMpXG4gICAgcmV0dXJuIHRoaXM7XG5cbiAgLy8gbm90IGxpc3RlbmluZyBmb3IgcmVtb3ZlTGlzdGVuZXIsIG5vIG5lZWQgdG8gZW1pdFxuICBpZiAoIXRoaXMuX2V2ZW50cy5yZW1vdmVMaXN0ZW5lcikge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKVxuICAgICAgdGhpcy5fZXZlbnRzID0ge307XG4gICAgZWxzZSBpZiAodGhpcy5fZXZlbnRzW3R5cGVdKVxuICAgICAgZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8vIGVtaXQgcmVtb3ZlTGlzdGVuZXIgZm9yIGFsbCBsaXN0ZW5lcnMgb24gYWxsIGV2ZW50c1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgIGZvciAoa2V5IGluIHRoaXMuX2V2ZW50cykge1xuICAgICAgaWYgKGtleSA9PT0gJ3JlbW92ZUxpc3RlbmVyJykgY29udGludWU7XG4gICAgICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycyhrZXkpO1xuICAgIH1cbiAgICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycygncmVtb3ZlTGlzdGVuZXInKTtcbiAgICB0aGlzLl9ldmVudHMgPSB7fTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGxpc3RlbmVycyA9IHRoaXMuX2V2ZW50c1t0eXBlXTtcblxuICBpZiAoaXNGdW5jdGlvbihsaXN0ZW5lcnMpKSB7XG4gICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcnMpO1xuICB9IGVsc2UgaWYgKGxpc3RlbmVycykge1xuICAgIC8vIExJRk8gb3JkZXJcbiAgICB3aGlsZSAobGlzdGVuZXJzLmxlbmd0aClcbiAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXJzW2xpc3RlbmVycy5sZW5ndGggLSAxXSk7XG4gIH1cbiAgZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtcblxuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJzID0gZnVuY3Rpb24odHlwZSkge1xuICB2YXIgcmV0O1xuICBpZiAoIXRoaXMuX2V2ZW50cyB8fCAhdGhpcy5fZXZlbnRzW3R5cGVdKVxuICAgIHJldCA9IFtdO1xuICBlbHNlIGlmIChpc0Z1bmN0aW9uKHRoaXMuX2V2ZW50c1t0eXBlXSkpXG4gICAgcmV0ID0gW3RoaXMuX2V2ZW50c1t0eXBlXV07XG4gIGVsc2VcbiAgICByZXQgPSB0aGlzLl9ldmVudHNbdHlwZV0uc2xpY2UoKTtcbiAgcmV0dXJuIHJldDtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJDb3VudCA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgaWYgKHRoaXMuX2V2ZW50cykge1xuICAgIHZhciBldmxpc3RlbmVyID0gdGhpcy5fZXZlbnRzW3R5cGVdO1xuXG4gICAgaWYgKGlzRnVuY3Rpb24oZXZsaXN0ZW5lcikpXG4gICAgICByZXR1cm4gMTtcbiAgICBlbHNlIGlmIChldmxpc3RlbmVyKVxuICAgICAgcmV0dXJuIGV2bGlzdGVuZXIubGVuZ3RoO1xuICB9XG4gIHJldHVybiAwO1xufTtcblxuRXZlbnRFbWl0dGVyLmxpc3RlbmVyQ291bnQgPSBmdW5jdGlvbihlbWl0dGVyLCB0eXBlKSB7XG4gIHJldHVybiBlbWl0dGVyLmxpc3RlbmVyQ291bnQodHlwZSk7XG59O1xuXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ2Z1bmN0aW9uJztcbn1cblxuZnVuY3Rpb24gaXNOdW1iZXIoYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnbnVtYmVyJztcbn1cblxuZnVuY3Rpb24gaXNPYmplY3QoYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnb2JqZWN0JyAmJiBhcmcgIT09IG51bGw7XG59XG5cbmZ1bmN0aW9uIGlzVW5kZWZpbmVkKGFyZykge1xuICByZXR1cm4gYXJnID09PSB2b2lkIDA7XG59XG4iLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcblxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gc2V0VGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgc2V0VGltZW91dChkcmFpblF1ZXVlLCAwKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LTIwMTUsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cy5EaXNwYXRjaGVyID0gcmVxdWlyZSgnLi9saWIvRGlzcGF0Y2hlcicpO1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtMjAxNSwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBEaXNwYXRjaGVyXG4gKiBcbiAqIEBwcmV2ZW50TXVuZ2VcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uJyk7IH0gfVxuXG52YXIgaW52YXJpYW50ID0gcmVxdWlyZSgnZmJqcy9saWIvaW52YXJpYW50Jyk7XG5cbnZhciBfcHJlZml4ID0gJ0lEXyc7XG5cbi8qKlxuICogRGlzcGF0Y2hlciBpcyB1c2VkIHRvIGJyb2FkY2FzdCBwYXlsb2FkcyB0byByZWdpc3RlcmVkIGNhbGxiYWNrcy4gVGhpcyBpc1xuICogZGlmZmVyZW50IGZyb20gZ2VuZXJpYyBwdWItc3ViIHN5c3RlbXMgaW4gdHdvIHdheXM6XG4gKlxuICogICAxKSBDYWxsYmFja3MgYXJlIG5vdCBzdWJzY3JpYmVkIHRvIHBhcnRpY3VsYXIgZXZlbnRzLiBFdmVyeSBwYXlsb2FkIGlzXG4gKiAgICAgIGRpc3BhdGNoZWQgdG8gZXZlcnkgcmVnaXN0ZXJlZCBjYWxsYmFjay5cbiAqICAgMikgQ2FsbGJhY2tzIGNhbiBiZSBkZWZlcnJlZCBpbiB3aG9sZSBvciBwYXJ0IHVudGlsIG90aGVyIGNhbGxiYWNrcyBoYXZlXG4gKiAgICAgIGJlZW4gZXhlY3V0ZWQuXG4gKlxuICogRm9yIGV4YW1wbGUsIGNvbnNpZGVyIHRoaXMgaHlwb3RoZXRpY2FsIGZsaWdodCBkZXN0aW5hdGlvbiBmb3JtLCB3aGljaFxuICogc2VsZWN0cyBhIGRlZmF1bHQgY2l0eSB3aGVuIGEgY291bnRyeSBpcyBzZWxlY3RlZDpcbiAqXG4gKiAgIHZhciBmbGlnaHREaXNwYXRjaGVyID0gbmV3IERpc3BhdGNoZXIoKTtcbiAqXG4gKiAgIC8vIEtlZXBzIHRyYWNrIG9mIHdoaWNoIGNvdW50cnkgaXMgc2VsZWN0ZWRcbiAqICAgdmFyIENvdW50cnlTdG9yZSA9IHtjb3VudHJ5OiBudWxsfTtcbiAqXG4gKiAgIC8vIEtlZXBzIHRyYWNrIG9mIHdoaWNoIGNpdHkgaXMgc2VsZWN0ZWRcbiAqICAgdmFyIENpdHlTdG9yZSA9IHtjaXR5OiBudWxsfTtcbiAqXG4gKiAgIC8vIEtlZXBzIHRyYWNrIG9mIHRoZSBiYXNlIGZsaWdodCBwcmljZSBvZiB0aGUgc2VsZWN0ZWQgY2l0eVxuICogICB2YXIgRmxpZ2h0UHJpY2VTdG9yZSA9IHtwcmljZTogbnVsbH1cbiAqXG4gKiBXaGVuIGEgdXNlciBjaGFuZ2VzIHRoZSBzZWxlY3RlZCBjaXR5LCB3ZSBkaXNwYXRjaCB0aGUgcGF5bG9hZDpcbiAqXG4gKiAgIGZsaWdodERpc3BhdGNoZXIuZGlzcGF0Y2goe1xuICogICAgIGFjdGlvblR5cGU6ICdjaXR5LXVwZGF0ZScsXG4gKiAgICAgc2VsZWN0ZWRDaXR5OiAncGFyaXMnXG4gKiAgIH0pO1xuICpcbiAqIFRoaXMgcGF5bG9hZCBpcyBkaWdlc3RlZCBieSBgQ2l0eVN0b3JlYDpcbiAqXG4gKiAgIGZsaWdodERpc3BhdGNoZXIucmVnaXN0ZXIoZnVuY3Rpb24ocGF5bG9hZCkge1xuICogICAgIGlmIChwYXlsb2FkLmFjdGlvblR5cGUgPT09ICdjaXR5LXVwZGF0ZScpIHtcbiAqICAgICAgIENpdHlTdG9yZS5jaXR5ID0gcGF5bG9hZC5zZWxlY3RlZENpdHk7XG4gKiAgICAgfVxuICogICB9KTtcbiAqXG4gKiBXaGVuIHRoZSB1c2VyIHNlbGVjdHMgYSBjb3VudHJ5LCB3ZSBkaXNwYXRjaCB0aGUgcGF5bG9hZDpcbiAqXG4gKiAgIGZsaWdodERpc3BhdGNoZXIuZGlzcGF0Y2goe1xuICogICAgIGFjdGlvblR5cGU6ICdjb3VudHJ5LXVwZGF0ZScsXG4gKiAgICAgc2VsZWN0ZWRDb3VudHJ5OiAnYXVzdHJhbGlhJ1xuICogICB9KTtcbiAqXG4gKiBUaGlzIHBheWxvYWQgaXMgZGlnZXN0ZWQgYnkgYm90aCBzdG9yZXM6XG4gKlxuICogICBDb3VudHJ5U3RvcmUuZGlzcGF0Y2hUb2tlbiA9IGZsaWdodERpc3BhdGNoZXIucmVnaXN0ZXIoZnVuY3Rpb24ocGF5bG9hZCkge1xuICogICAgIGlmIChwYXlsb2FkLmFjdGlvblR5cGUgPT09ICdjb3VudHJ5LXVwZGF0ZScpIHtcbiAqICAgICAgIENvdW50cnlTdG9yZS5jb3VudHJ5ID0gcGF5bG9hZC5zZWxlY3RlZENvdW50cnk7XG4gKiAgICAgfVxuICogICB9KTtcbiAqXG4gKiBXaGVuIHRoZSBjYWxsYmFjayB0byB1cGRhdGUgYENvdW50cnlTdG9yZWAgaXMgcmVnaXN0ZXJlZCwgd2Ugc2F2ZSBhIHJlZmVyZW5jZVxuICogdG8gdGhlIHJldHVybmVkIHRva2VuLiBVc2luZyB0aGlzIHRva2VuIHdpdGggYHdhaXRGb3IoKWAsIHdlIGNhbiBndWFyYW50ZWVcbiAqIHRoYXQgYENvdW50cnlTdG9yZWAgaXMgdXBkYXRlZCBiZWZvcmUgdGhlIGNhbGxiYWNrIHRoYXQgdXBkYXRlcyBgQ2l0eVN0b3JlYFxuICogbmVlZHMgdG8gcXVlcnkgaXRzIGRhdGEuXG4gKlxuICogICBDaXR5U3RvcmUuZGlzcGF0Y2hUb2tlbiA9IGZsaWdodERpc3BhdGNoZXIucmVnaXN0ZXIoZnVuY3Rpb24ocGF5bG9hZCkge1xuICogICAgIGlmIChwYXlsb2FkLmFjdGlvblR5cGUgPT09ICdjb3VudHJ5LXVwZGF0ZScpIHtcbiAqICAgICAgIC8vIGBDb3VudHJ5U3RvcmUuY291bnRyeWAgbWF5IG5vdCBiZSB1cGRhdGVkLlxuICogICAgICAgZmxpZ2h0RGlzcGF0Y2hlci53YWl0Rm9yKFtDb3VudHJ5U3RvcmUuZGlzcGF0Y2hUb2tlbl0pO1xuICogICAgICAgLy8gYENvdW50cnlTdG9yZS5jb3VudHJ5YCBpcyBub3cgZ3VhcmFudGVlZCB0byBiZSB1cGRhdGVkLlxuICpcbiAqICAgICAgIC8vIFNlbGVjdCB0aGUgZGVmYXVsdCBjaXR5IGZvciB0aGUgbmV3IGNvdW50cnlcbiAqICAgICAgIENpdHlTdG9yZS5jaXR5ID0gZ2V0RGVmYXVsdENpdHlGb3JDb3VudHJ5KENvdW50cnlTdG9yZS5jb3VudHJ5KTtcbiAqICAgICB9XG4gKiAgIH0pO1xuICpcbiAqIFRoZSB1c2FnZSBvZiBgd2FpdEZvcigpYCBjYW4gYmUgY2hhaW5lZCwgZm9yIGV4YW1wbGU6XG4gKlxuICogICBGbGlnaHRQcmljZVN0b3JlLmRpc3BhdGNoVG9rZW4gPVxuICogICAgIGZsaWdodERpc3BhdGNoZXIucmVnaXN0ZXIoZnVuY3Rpb24ocGF5bG9hZCkge1xuICogICAgICAgc3dpdGNoIChwYXlsb2FkLmFjdGlvblR5cGUpIHtcbiAqICAgICAgICAgY2FzZSAnY291bnRyeS11cGRhdGUnOlxuICogICAgICAgICBjYXNlICdjaXR5LXVwZGF0ZSc6XG4gKiAgICAgICAgICAgZmxpZ2h0RGlzcGF0Y2hlci53YWl0Rm9yKFtDaXR5U3RvcmUuZGlzcGF0Y2hUb2tlbl0pO1xuICogICAgICAgICAgIEZsaWdodFByaWNlU3RvcmUucHJpY2UgPVxuICogICAgICAgICAgICAgZ2V0RmxpZ2h0UHJpY2VTdG9yZShDb3VudHJ5U3RvcmUuY291bnRyeSwgQ2l0eVN0b3JlLmNpdHkpO1xuICogICAgICAgICAgIGJyZWFrO1xuICogICAgIH1cbiAqICAgfSk7XG4gKlxuICogVGhlIGBjb3VudHJ5LXVwZGF0ZWAgcGF5bG9hZCB3aWxsIGJlIGd1YXJhbnRlZWQgdG8gaW52b2tlIHRoZSBzdG9yZXMnXG4gKiByZWdpc3RlcmVkIGNhbGxiYWNrcyBpbiBvcmRlcjogYENvdW50cnlTdG9yZWAsIGBDaXR5U3RvcmVgLCB0aGVuXG4gKiBgRmxpZ2h0UHJpY2VTdG9yZWAuXG4gKi9cblxudmFyIERpc3BhdGNoZXIgPSAoZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBEaXNwYXRjaGVyKCkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBEaXNwYXRjaGVyKTtcblxuICAgIHRoaXMuX2NhbGxiYWNrcyA9IHt9O1xuICAgIHRoaXMuX2lzRGlzcGF0Y2hpbmcgPSBmYWxzZTtcbiAgICB0aGlzLl9pc0hhbmRsZWQgPSB7fTtcbiAgICB0aGlzLl9pc1BlbmRpbmcgPSB7fTtcbiAgICB0aGlzLl9sYXN0SUQgPSAxO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVycyBhIGNhbGxiYWNrIHRvIGJlIGludm9rZWQgd2l0aCBldmVyeSBkaXNwYXRjaGVkIHBheWxvYWQuIFJldHVybnNcbiAgICogYSB0b2tlbiB0aGF0IGNhbiBiZSB1c2VkIHdpdGggYHdhaXRGb3IoKWAuXG4gICAqL1xuXG4gIERpc3BhdGNoZXIucHJvdG90eXBlLnJlZ2lzdGVyID0gZnVuY3Rpb24gcmVnaXN0ZXIoY2FsbGJhY2spIHtcbiAgICB2YXIgaWQgPSBfcHJlZml4ICsgdGhpcy5fbGFzdElEKys7XG4gICAgdGhpcy5fY2FsbGJhY2tzW2lkXSA9IGNhbGxiYWNrO1xuICAgIHJldHVybiBpZDtcbiAgfTtcblxuICAvKipcbiAgICogUmVtb3ZlcyBhIGNhbGxiYWNrIGJhc2VkIG9uIGl0cyB0b2tlbi5cbiAgICovXG5cbiAgRGlzcGF0Y2hlci5wcm90b3R5cGUudW5yZWdpc3RlciA9IGZ1bmN0aW9uIHVucmVnaXN0ZXIoaWQpIHtcbiAgICAhdGhpcy5fY2FsbGJhY2tzW2lkXSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdEaXNwYXRjaGVyLnVucmVnaXN0ZXIoLi4uKTogYCVzYCBkb2VzIG5vdCBtYXAgdG8gYSByZWdpc3RlcmVkIGNhbGxiYWNrLicsIGlkKSA6IGludmFyaWFudChmYWxzZSkgOiB1bmRlZmluZWQ7XG4gICAgZGVsZXRlIHRoaXMuX2NhbGxiYWNrc1tpZF07XG4gIH07XG5cbiAgLyoqXG4gICAqIFdhaXRzIGZvciB0aGUgY2FsbGJhY2tzIHNwZWNpZmllZCB0byBiZSBpbnZva2VkIGJlZm9yZSBjb250aW51aW5nIGV4ZWN1dGlvblxuICAgKiBvZiB0aGUgY3VycmVudCBjYWxsYmFjay4gVGhpcyBtZXRob2Qgc2hvdWxkIG9ubHkgYmUgdXNlZCBieSBhIGNhbGxiYWNrIGluXG4gICAqIHJlc3BvbnNlIHRvIGEgZGlzcGF0Y2hlZCBwYXlsb2FkLlxuICAgKi9cblxuICBEaXNwYXRjaGVyLnByb3RvdHlwZS53YWl0Rm9yID0gZnVuY3Rpb24gd2FpdEZvcihpZHMpIHtcbiAgICAhdGhpcy5faXNEaXNwYXRjaGluZyA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdEaXNwYXRjaGVyLndhaXRGb3IoLi4uKTogTXVzdCBiZSBpbnZva2VkIHdoaWxlIGRpc3BhdGNoaW5nLicpIDogaW52YXJpYW50KGZhbHNlKSA6IHVuZGVmaW5lZDtcbiAgICBmb3IgKHZhciBpaSA9IDA7IGlpIDwgaWRzLmxlbmd0aDsgaWkrKykge1xuICAgICAgdmFyIGlkID0gaWRzW2lpXTtcbiAgICAgIGlmICh0aGlzLl9pc1BlbmRpbmdbaWRdKSB7XG4gICAgICAgICF0aGlzLl9pc0hhbmRsZWRbaWRdID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ0Rpc3BhdGNoZXIud2FpdEZvciguLi4pOiBDaXJjdWxhciBkZXBlbmRlbmN5IGRldGVjdGVkIHdoaWxlICcgKyAnd2FpdGluZyBmb3IgYCVzYC4nLCBpZCkgOiBpbnZhcmlhbnQoZmFsc2UpIDogdW5kZWZpbmVkO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgICF0aGlzLl9jYWxsYmFja3NbaWRdID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ0Rpc3BhdGNoZXIud2FpdEZvciguLi4pOiBgJXNgIGRvZXMgbm90IG1hcCB0byBhIHJlZ2lzdGVyZWQgY2FsbGJhY2suJywgaWQpIDogaW52YXJpYW50KGZhbHNlKSA6IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMuX2ludm9rZUNhbGxiYWNrKGlkKTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIERpc3BhdGNoZXMgYSBwYXlsb2FkIHRvIGFsbCByZWdpc3RlcmVkIGNhbGxiYWNrcy5cbiAgICovXG5cbiAgRGlzcGF0Y2hlci5wcm90b3R5cGUuZGlzcGF0Y2ggPSBmdW5jdGlvbiBkaXNwYXRjaChwYXlsb2FkKSB7XG4gICAgISF0aGlzLl9pc0Rpc3BhdGNoaW5nID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ0Rpc3BhdGNoLmRpc3BhdGNoKC4uLik6IENhbm5vdCBkaXNwYXRjaCBpbiB0aGUgbWlkZGxlIG9mIGEgZGlzcGF0Y2guJykgOiBpbnZhcmlhbnQoZmFsc2UpIDogdW5kZWZpbmVkO1xuICAgIHRoaXMuX3N0YXJ0RGlzcGF0Y2hpbmcocGF5bG9hZCk7XG4gICAgdHJ5IHtcbiAgICAgIGZvciAodmFyIGlkIGluIHRoaXMuX2NhbGxiYWNrcykge1xuICAgICAgICBpZiAodGhpcy5faXNQZW5kaW5nW2lkXSkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2ludm9rZUNhbGxiYWNrKGlkKTtcbiAgICAgIH1cbiAgICB9IGZpbmFsbHkge1xuICAgICAgdGhpcy5fc3RvcERpc3BhdGNoaW5nKCk7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBJcyB0aGlzIERpc3BhdGNoZXIgY3VycmVudGx5IGRpc3BhdGNoaW5nLlxuICAgKi9cblxuICBEaXNwYXRjaGVyLnByb3RvdHlwZS5pc0Rpc3BhdGNoaW5nID0gZnVuY3Rpb24gaXNEaXNwYXRjaGluZygpIHtcbiAgICByZXR1cm4gdGhpcy5faXNEaXNwYXRjaGluZztcbiAgfTtcblxuICAvKipcbiAgICogQ2FsbCB0aGUgY2FsbGJhY2sgc3RvcmVkIHdpdGggdGhlIGdpdmVuIGlkLiBBbHNvIGRvIHNvbWUgaW50ZXJuYWxcbiAgICogYm9va2tlZXBpbmcuXG4gICAqXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cblxuICBEaXNwYXRjaGVyLnByb3RvdHlwZS5faW52b2tlQ2FsbGJhY2sgPSBmdW5jdGlvbiBfaW52b2tlQ2FsbGJhY2soaWQpIHtcbiAgICB0aGlzLl9pc1BlbmRpbmdbaWRdID0gdHJ1ZTtcbiAgICB0aGlzLl9jYWxsYmFja3NbaWRdKHRoaXMuX3BlbmRpbmdQYXlsb2FkKTtcbiAgICB0aGlzLl9pc0hhbmRsZWRbaWRdID0gdHJ1ZTtcbiAgfTtcblxuICAvKipcbiAgICogU2V0IHVwIGJvb2trZWVwaW5nIG5lZWRlZCB3aGVuIGRpc3BhdGNoaW5nLlxuICAgKlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG5cbiAgRGlzcGF0Y2hlci5wcm90b3R5cGUuX3N0YXJ0RGlzcGF0Y2hpbmcgPSBmdW5jdGlvbiBfc3RhcnREaXNwYXRjaGluZyhwYXlsb2FkKSB7XG4gICAgZm9yICh2YXIgaWQgaW4gdGhpcy5fY2FsbGJhY2tzKSB7XG4gICAgICB0aGlzLl9pc1BlbmRpbmdbaWRdID0gZmFsc2U7XG4gICAgICB0aGlzLl9pc0hhbmRsZWRbaWRdID0gZmFsc2U7XG4gICAgfVxuICAgIHRoaXMuX3BlbmRpbmdQYXlsb2FkID0gcGF5bG9hZDtcbiAgICB0aGlzLl9pc0Rpc3BhdGNoaW5nID0gdHJ1ZTtcbiAgfTtcblxuICAvKipcbiAgICogQ2xlYXIgYm9va2tlZXBpbmcgdXNlZCBmb3IgZGlzcGF0Y2hpbmcuXG4gICAqXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cblxuICBEaXNwYXRjaGVyLnByb3RvdHlwZS5fc3RvcERpc3BhdGNoaW5nID0gZnVuY3Rpb24gX3N0b3BEaXNwYXRjaGluZygpIHtcbiAgICBkZWxldGUgdGhpcy5fcGVuZGluZ1BheWxvYWQ7XG4gICAgdGhpcy5faXNEaXNwYXRjaGluZyA9IGZhbHNlO1xuICB9O1xuXG4gIHJldHVybiBEaXNwYXRjaGVyO1xufSkoKTtcblxubW9kdWxlLmV4cG9ydHMgPSBEaXNwYXRjaGVyOyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtMjAxNSwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBpbnZhcmlhbnRcbiAqL1xuXG5cInVzZSBzdHJpY3RcIjtcblxuLyoqXG4gKiBVc2UgaW52YXJpYW50KCkgdG8gYXNzZXJ0IHN0YXRlIHdoaWNoIHlvdXIgcHJvZ3JhbSBhc3N1bWVzIHRvIGJlIHRydWUuXG4gKlxuICogUHJvdmlkZSBzcHJpbnRmLXN0eWxlIGZvcm1hdCAob25seSAlcyBpcyBzdXBwb3J0ZWQpIGFuZCBhcmd1bWVudHNcbiAqIHRvIHByb3ZpZGUgaW5mb3JtYXRpb24gYWJvdXQgd2hhdCBicm9rZSBhbmQgd2hhdCB5b3Ugd2VyZVxuICogZXhwZWN0aW5nLlxuICpcbiAqIFRoZSBpbnZhcmlhbnQgbWVzc2FnZSB3aWxsIGJlIHN0cmlwcGVkIGluIHByb2R1Y3Rpb24sIGJ1dCB0aGUgaW52YXJpYW50XG4gKiB3aWxsIHJlbWFpbiB0byBlbnN1cmUgbG9naWMgZG9lcyBub3QgZGlmZmVyIGluIHByb2R1Y3Rpb24uXG4gKi9cblxudmFyIGludmFyaWFudCA9IGZ1bmN0aW9uIChjb25kaXRpb24sIGZvcm1hdCwgYSwgYiwgYywgZCwgZSwgZikge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhcmlhbnQgcmVxdWlyZXMgYW4gZXJyb3IgbWVzc2FnZSBhcmd1bWVudCcpO1xuICAgIH1cbiAgfVxuXG4gIGlmICghY29uZGl0aW9uKSB7XG4gICAgdmFyIGVycm9yO1xuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgZXJyb3IgPSBuZXcgRXJyb3IoJ01pbmlmaWVkIGV4Y2VwdGlvbiBvY2N1cnJlZDsgdXNlIHRoZSBub24tbWluaWZpZWQgZGV2IGVudmlyb25tZW50ICcgKyAnZm9yIHRoZSBmdWxsIGVycm9yIG1lc3NhZ2UgYW5kIGFkZGl0aW9uYWwgaGVscGZ1bCB3YXJuaW5ncy4nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGFyZ3MgPSBbYSwgYiwgYywgZCwgZSwgZl07XG4gICAgICB2YXIgYXJnSW5kZXggPSAwO1xuICAgICAgZXJyb3IgPSBuZXcgRXJyb3IoJ0ludmFyaWFudCBWaW9sYXRpb246ICcgKyBmb3JtYXQucmVwbGFjZSgvJXMvZywgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gYXJnc1thcmdJbmRleCsrXTtcbiAgICAgIH0pKTtcbiAgICB9XG5cbiAgICBlcnJvci5mcmFtZXNUb1BvcCA9IDE7IC8vIHdlIGRvbid0IGNhcmUgYWJvdXQgaW52YXJpYW50J3Mgb3duIGZyYW1lXG4gICAgdGhyb3cgZXJyb3I7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gaW52YXJpYW50OyIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG4ndXNlIHN0cmljdCc7XG52YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xudmFyIHByb3BJc0VudW1lcmFibGUgPSBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuXG5mdW5jdGlvbiB0b09iamVjdCh2YWwpIHtcblx0aWYgKHZhbCA9PT0gbnVsbCB8fCB2YWwgPT09IHVuZGVmaW5lZCkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ09iamVjdC5hc3NpZ24gY2Fubm90IGJlIGNhbGxlZCB3aXRoIG51bGwgb3IgdW5kZWZpbmVkJyk7XG5cdH1cblxuXHRyZXR1cm4gT2JqZWN0KHZhbCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0LCBzb3VyY2UpIHtcblx0dmFyIGZyb207XG5cdHZhciB0byA9IHRvT2JqZWN0KHRhcmdldCk7XG5cdHZhciBzeW1ib2xzO1xuXG5cdGZvciAodmFyIHMgPSAxOyBzIDwgYXJndW1lbnRzLmxlbmd0aDsgcysrKSB7XG5cdFx0ZnJvbSA9IE9iamVjdChhcmd1bWVudHNbc10pO1xuXG5cdFx0Zm9yICh2YXIga2V5IGluIGZyb20pIHtcblx0XHRcdGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGZyb20sIGtleSkpIHtcblx0XHRcdFx0dG9ba2V5XSA9IGZyb21ba2V5XTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scykge1xuXHRcdFx0c3ltYm9scyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoZnJvbSk7XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHN5bWJvbHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0aWYgKHByb3BJc0VudW1lcmFibGUuY2FsbChmcm9tLCBzeW1ib2xzW2ldKSkge1xuXHRcdFx0XHRcdHRvW3N5bWJvbHNbaV1dID0gZnJvbVtzeW1ib2xzW2ldXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiB0bztcbn07XG4iXX0=
