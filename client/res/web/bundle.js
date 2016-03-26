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
  document.getElementById('content')
);
},{"./pages/contact.js":"C:\\workbench\\repos\\tookiebloom\\blog_1\\client\\interfaces\\web\\app\\pages\\contact.js","./pages/index.js":"C:\\workbench\\repos\\tookiebloom\\blog_1\\client\\interfaces\\web\\app\\pages\\index.js"}],"C:\\workbench\\repos\\tookiebloom\\blog_1\\client\\interfaces\\web\\app\\components\\commentbox.js":[function(require,module,exports){






var CommentBox = React.createClass({displayName: "CommentBox",

	getInitialState: function(){
		return {variablePassed: this.props.passedValue};
	},


	componentWillReceiveProps: function(nextProps) {
		  console.log(nextProps);

		  this.setState({ variablePassed:nextProps.passedValue})
	},

	render: function() {
		return (

			React.createElement("div", {className: "commentBox"}, 
				"Hello, world! test modific automat I am a CommentBox in a different file!. test modificat ", this.state.variablePassed
			)
		);
	}

});


module.exports = CommentBox;
},{}],"C:\\workbench\\repos\\tookiebloom\\blog_1\\client\\interfaces\\web\\app\\pages\\contact.js":[function(require,module,exports){
var CommentBox = require('../components/commentbox.js');

var variablePassed = 0;



var Contact = React.createClass({displayName: "Contact",
	getInitialState: function(){
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
        "Hello, world! This is the contact page, next is the comment box:", 

		React.createElement(CommentBox, {passedValue: this.state.variablePassed})
      )
    );
  }

});


module.exports = Contact;
},{"../components/commentbox.js":"C:\\workbench\\repos\\tookiebloom\\blog_1\\client\\interfaces\\web\\app\\components\\commentbox.js"}],"C:\\workbench\\repos\\tookiebloom\\blog_1\\client\\interfaces\\web\\app\\pages\\index.js":[function(require,module,exports){
var Index = React.createClass({displayName: "Index",



  render: function() {
    return (

      React.createElement("div", {className: "Index"}, 
        "Hello, world! This is the index page"
      )
    );
  }

});


module.exports = Index;
},{}]},{},["C:\\workbench\\repos\\tookiebloom\\blog_1\\client\\interfaces\\web\\app\\app.js"])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJDOlxcd29ya2JlbmNoXFxyZXBvc1xcdG9va2llYmxvb21cXGJsb2dfMVxcY2xpZW50XFxpbnRlcmZhY2VzXFx3ZWJcXGFwcFxcYXBwLmpzIiwiQzpcXHdvcmtiZW5jaFxccmVwb3NcXHRvb2tpZWJsb29tXFxibG9nXzFcXGNsaWVudFxcaW50ZXJmYWNlc1xcd2ViXFxhcHBcXGNvbXBvbmVudHNcXGNvbW1lbnRib3guanMiLCJDOlxcd29ya2JlbmNoXFxyZXBvc1xcdG9va2llYmxvb21cXGJsb2dfMVxcY2xpZW50XFxpbnRlcmZhY2VzXFx3ZWJcXGFwcFxccGFnZXNcXGNvbnRhY3QuanMiLCJDOlxcd29ya2JlbmNoXFxyZXBvc1xcdG9va2llYmxvb21cXGJsb2dfMVxcY2xpZW50XFxpbnRlcmZhY2VzXFx3ZWJcXGFwcFxccGFnZXNcXGluZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsSUFBSSxTQUFTLEdBQUcsT0FBTyxDQUFDLGtCQUFrQixDQUFDLENBQUM7QUFDNUMsSUFBSSxXQUFXLEdBQUcsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUM7O0FBRWhELDhCQUE4QjtBQUM5QixJQUFJLE1BQU0sR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDO0FBQ2hDLElBQUksS0FBSyxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUM7QUFDOUIsSUFBSSxJQUFJLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQztBQUM1QixJQUFJLGNBQWMsR0FBRyxXQUFXLENBQUMsY0FBYyxDQUFDO0FBQ2hEO0FBQ0E7QUFDQTs7RUFFRSxRQUFRLENBQUMsTUFBTTtHQUNkLG9CQUFDLE1BQU0sRUFBQSxDQUFBLENBQUMsT0FBQSxFQUFPLENBQUUsY0FBZ0IsQ0FBQSxFQUFBO0FBQ3BDLE9BQU8sb0JBQUMsS0FBSyxFQUFBLENBQUEsQ0FBQyxJQUFBLEVBQUksQ0FBQyxTQUFBLEVBQVMsQ0FBQyxTQUFBLEVBQVMsQ0FBRSxXQUFhLENBQVEsQ0FBQSxFQUFBOztPQUV0RCxvQkFBQyxLQUFLLEVBQUEsQ0FBQSxDQUFDLElBQUEsRUFBSSxDQUFDLEdBQUEsRUFBRyxDQUFDLFNBQUEsRUFBUyxDQUFFLFNBQVcsQ0FBUSxDQUFBO0tBQ3ZDLENBQUE7RUFDWixRQUFRLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQztDQUNuQyxDQUFDOztBQ25CRjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLElBQUksZ0NBQWdDLDBCQUFBOztDQUVuQyxlQUFlLEVBQUUsVUFBVTtFQUMxQixPQUFPLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDbEQsRUFBRTtBQUNGOztDQUVDLHlCQUF5QixFQUFFLFNBQVMsU0FBUyxFQUFFO0FBQ2hELElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQzs7SUFFdkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLGNBQWMsQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDMUQsRUFBRTs7Q0FFRCxNQUFNLEVBQUUsV0FBVztBQUNwQixFQUFFOztHQUVDLG9CQUFBLEtBQUksRUFBQSxDQUFBLENBQUMsU0FBQSxFQUFTLENBQUMsWUFBYSxDQUFBLEVBQUE7QUFBQSxJQUFBLDRGQUFBLEVBQ2dFLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFFO0dBQ2pILENBQUE7SUFDTDtBQUNKLEVBQUU7O0FBRUYsQ0FBQyxDQUFDLENBQUM7QUFDSDs7QUFFQSxNQUFNLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQzs7QUMvQjVCLElBQUksVUFBVSxHQUFHLE9BQU8sQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDOztBQUV4RCxJQUFJLGNBQWMsR0FBRyxDQUFDLENBQUM7QUFDdkI7QUFDQTs7QUFFQSxJQUFJLDZCQUE2Qix1QkFBQTtDQUNoQyxlQUFlLEVBQUUsVUFBVTtFQUMxQixPQUFPLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQzdCLEVBQUU7O0NBRUQsaUJBQWlCLEVBQUUsV0FBVztBQUMvQixFQUFFLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQzs7QUFFbEIsRUFBRSxXQUFXLENBQUMsVUFBVTs7QUFFeEIsR0FBRyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDOztHQUV2QixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7R0FDdkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztHQUNyQixFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ1gsRUFBRTs7RUFFQSxNQUFNLEVBQUUsV0FBVztBQUNyQixJQUFJOztNQUVFLG9CQUFBLEtBQUksRUFBQSxDQUFBLENBQUMsU0FBQSxFQUFTLENBQUMsU0FBVSxDQUFBLEVBQUEsaUJBQUE7QUFBQSxRQUFBLGtFQUFBLEVBQUE7QUFBQTtBQUFBLEVBRzdCLG9CQUFDLFVBQVUsRUFBQSxDQUFBLENBQUMsV0FBQSxFQUFXLENBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFlLENBQUEsQ0FBRyxDQUFBO01BQzVDLENBQUE7TUFDTjtBQUNOLEdBQUc7O0FBRUgsQ0FBQyxDQUFDLENBQUM7QUFDSDs7QUFFQSxNQUFNLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQzs7QUNyQ3pCLElBQUksMkJBQTJCLHFCQUFBO0FBQy9CO0FBQ0E7O0VBRUUsTUFBTSxFQUFFLFdBQVc7QUFDckIsSUFBSTs7TUFFRSxvQkFBQSxLQUFJLEVBQUEsQ0FBQSxDQUFDLFNBQUEsRUFBUyxDQUFDLE9BQVEsQ0FBQSxFQUFBO0FBQUEsUUFBQSxzQ0FBQTtBQUFBLE1BRWpCLENBQUE7TUFDTjtBQUNOLEdBQUc7O0FBRUgsQ0FBQyxDQUFDLENBQUM7QUFDSDs7QUFFQSxNQUFNLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgSW5kZXhQYWdlID0gcmVxdWlyZSgnLi9wYWdlcy9pbmRleC5qcycpO1xyXG52YXIgQ29udGFjdFBhZ2UgPSByZXF1aXJlKCcuL3BhZ2VzL2NvbnRhY3QuanMnKTtcclxuXHJcbi8vIG5vdCB1c2luZyBhbiBFUzYgdHJhbnNwaWxlclxyXG52YXIgUm91dGVyID0gUmVhY3RSb3V0ZXIuUm91dGVyO1xyXG52YXIgUm91dGUgPSBSZWFjdFJvdXRlci5Sb3V0ZTtcclxudmFyIExpbmsgPSBSZWFjdFJvdXRlci5MaW5rO1xyXG52YXIgYnJvd3Nlckhpc3RvcnkgPSBSZWFjdFJvdXRlci5icm93c2VySGlzdG9yeTtcclxuXHJcblxyXG5cclxuXHJcbiAgUmVhY3RET00ucmVuZGVyKFxyXG5cdCAgPFJvdXRlciBoaXN0b3J5PXticm93c2VySGlzdG9yeX0+XHJcblx0ICAgICAgPFJvdXRlIHBhdGg9XCJjb250YWN0XCIgY29tcG9uZW50PXtDb250YWN0UGFnZX0+PC9Sb3V0ZT5cclxuXHJcblx0ICAgICAgPFJvdXRlIHBhdGg9XCIqXCIgY29tcG9uZW50PXtJbmRleFBhZ2V9PjwvUm91dGU+XHJcblx0ICAgIDwvUm91dGVyPixcclxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGVudCcpXHJcbik7XHJcbiIsIlxyXG5cclxuXHJcblxyXG5cclxuXHJcbnZhciBDb21tZW50Qm94ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cclxuXHRnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCl7XHJcblx0XHRyZXR1cm4ge3ZhcmlhYmxlUGFzc2VkOiB0aGlzLnByb3BzLnBhc3NlZFZhbHVlfTtcclxuXHR9LFxyXG5cclxuXHJcblx0Y29tcG9uZW50V2lsbFJlY2VpdmVQcm9wczogZnVuY3Rpb24obmV4dFByb3BzKSB7XHJcblx0XHQgIGNvbnNvbGUubG9nKG5leHRQcm9wcyk7XHJcblxyXG5cdFx0ICB0aGlzLnNldFN0YXRlKHsgdmFyaWFibGVQYXNzZWQ6bmV4dFByb3BzLnBhc3NlZFZhbHVlfSlcclxuXHR9LFxyXG5cclxuXHRyZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG5cdFx0cmV0dXJuIChcclxuXHJcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29tbWVudEJveFwiPlxyXG5cdFx0XHRcdEhlbGxvLCB3b3JsZCEgdGVzdCBtb2RpZmljIGF1dG9tYXQgSSBhbSBhIENvbW1lbnRCb3ggaW4gYSBkaWZmZXJlbnQgZmlsZSEuIHRlc3QgbW9kaWZpY2F0IHt0aGlzLnN0YXRlLnZhcmlhYmxlUGFzc2VkIH1cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQpO1xyXG5cdH1cclxuXHJcbn0pO1xyXG5cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQ29tbWVudEJveDtcclxuIiwidmFyIENvbW1lbnRCb3ggPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2NvbW1lbnRib3guanMnKTtcclxuXHJcbnZhciB2YXJpYWJsZVBhc3NlZCA9IDA7XHJcblxyXG5cclxuXHJcbnZhciBDb250YWN0ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cdGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKXtcclxuXHRcdHJldHVybiB7dmFyaWFibGVQYXNzZWQ6IDF9O1xyXG5cdH0sXHJcblxyXG5cdGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbigpIHtcclxuXHRcdHZhciBzZWxmID0gdGhpcztcclxuXHJcblx0XHRzZXRJbnRlcnZhbChmdW5jdGlvbigpe1xyXG5cclxuXHRcdFx0dmFyIHN0YXRlID0gc2VsZi5zdGF0ZTtcclxuXHJcblx0XHRcdHN0YXRlLnZhcmlhYmxlUGFzc2VkKys7XHJcblx0XHRcdHNlbGYuc2V0U3RhdGUoc3RhdGUpO1xyXG5cdFx0fSwgMTAwMCk7XHJcblx0fSxcclxuXHJcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiAoXHJcblxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIkNvbnRhY3RcIj4gZHNhZHNhXHJcbiAgICAgICAgSGVsbG8sIHdvcmxkISBUaGlzIGlzIHRoZSBjb250YWN0IHBhZ2UsIG5leHQgaXMgdGhlIGNvbW1lbnQgYm94OlxyXG5cclxuXHRcdDxDb21tZW50Qm94IHBhc3NlZFZhbHVlPXt0aGlzLnN0YXRlLnZhcmlhYmxlUGFzc2VkfSAvPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICk7XHJcbiAgfVxyXG5cclxufSk7XHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBDb250YWN0O1xyXG4iLCJ2YXIgSW5kZXggPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblxyXG5cclxuXHJcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiAoXHJcblxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIkluZGV4XCI+XHJcbiAgICAgICAgSGVsbG8sIHdvcmxkISBUaGlzIGlzIHRoZSBpbmRleCBwYWdlXHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxuICB9XHJcblxyXG59KTtcclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEluZGV4O1xyXG4iXX0=
