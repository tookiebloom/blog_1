var IndexPage = require('./pages/index.js');
var ContactPage = require('./pages/contact.js');
var PostPage = require('./pages/Post.js');
var Contact = require('./pages/Contact.js');
var Login = require('./pages/Login.js');
var Error = require('./pages/Error.js');


// not using an ES6 transpiler
var Router = ReactRouter.Router;
var Route = ReactRouter.Route; 
var Link = ReactRouter.Link;
var browserHistory = ReactRouter.browserHistory;




  ReactDOM.render(
	<Router history={browserHistory}>
		<Route path="/p/:permalink" component={(pageData && pageData.err_object ? Error :  PostPage)}></Route>
		<Route path="/contact" component={(pageData && pageData.err_object ? Error :  Contact)}></Route>
		<Route path="/login" component={(pageData && pageData.err_object ? Error :  Login)}></Route>
		<Route path="/" component={(pageData && pageData.err_object ? Error :  IndexPage)}></Route>
		<Route path="/t/:tag" component={(pageData && pageData.err_object ? Error :  IndexPage)}></Route>

		<Route path="*" component={Error}></Route>
	</Router>,
  document.getElementById('react-app')
);
