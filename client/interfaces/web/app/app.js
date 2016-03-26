var IndexPage = require('./pages/index.js');
var ContactPage = require('./pages/contact.js');

// not using an ES6 transpiler
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Link = ReactRouter.Link;
var browserHistory = ReactRouter.browserHistory;




  ReactDOM.render(
	  <Router history={browserHistory}>
	      <Route path="contact" component={ContactPage}></Route>

	      <Route path="*" component={IndexPage}></Route>
	    </Router>,
  document.getElementById('content')
);
