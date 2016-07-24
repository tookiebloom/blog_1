var IndexPage = require('./pages/index.js');
var ContactPage = require('./pages/contact.js');
var PostPage = require('./pages/Post.js');
var Contact = require('./pages/Contact.js');
var Login = require('./pages/Login.js');


// not using an ES6 transpiler
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Link = ReactRouter.Link;
var browserHistory = ReactRouter.browserHistory;




  ReactDOM.render(
	<Router history={browserHistory}>
		<Route path="/p/:permalink" component={PostPage}></Route>
		<Route path="/contact" component={Contact}></Route>
		<Route path="/login" component={Login}></Route>

		<Route path="*" component={IndexPage}></Route>
	</Router>,
  document.getElementById('react-app')
);
