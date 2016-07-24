/*Bootstrap Classes*/
var Grid = ReactBootstrap.Grid;
var Row = ReactBootstrap.Row;
var Col = ReactBootstrap.Col;

/*Components*/
var Header 		= require('../components/Header.js');
var Footer 		= require('../components/Footer.js');
var LoginForm = require('../components/login/LoginForm.js');
/*constants*/
var Actions = require('../constants/Actions.js');



var Login = React.createClass({


	getInitialState: function() {
		this.BlogStore = require('../stores/BlogStore.js')();
		return {};
	},


	render: function() {

		return ( 
			<Grid className="login-page"> 
				<Header />
 
				<Row>

					<Col xs={12} className="main-container" >

						<LoginForm validationMessage={ this.BlogStore.getLoginContext().validation_message }/>

					</Col>

				</Row>
				<Footer />
			</Grid> 
		);
	}

});


module.exports = Login;
