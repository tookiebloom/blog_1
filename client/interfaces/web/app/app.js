var Index = require('./views/index.js');
var Contact = require('./views/contact.js');

// not using an ES6 transpiler
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Link = ReactRouter.Link;
var browserHistory = ReactRouter.browserHistory;




  ReactDOM.render(
	  <Router history={browserHistory}>
	      <Route path="contact" component={Contact}></Route>

	      <Route path="*" component={Index}></Route>
	    </Router>,
  document.getElementById('content')
);
