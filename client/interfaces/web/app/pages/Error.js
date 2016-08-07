/*Bootstrap Classes*/
var Grid = ReactBootstrap.Grid;
var Row = ReactBootstrap.Row;
var Col = ReactBootstrap.Col;

/*Components*/
var Header 		= require('../components/Header.js');
var Footer 		= require('../components/Footer.js');


var Login = React.createClass({


	getInitialState: function() {
		this.BlogStore = require('../stores/BlogStore.js')();
		this._context = this.BlogStore.getErrorContext().err_object;
		return {};
	},

 
	render: function() {

		return ( 
			<Grid className="login-page"> 
				<Header />
				<Row>
					<Col xs={12} className="main-container" >
						<h2>{this._context.err_message}</h2>
					</Col>

					{this._context.err_report && 
						<Col xs={12} className="main-container error-report" >
							<pre>
								<code>
									{this._context.err_report}
								</code>
							</pre>
						</Col>
					}
				</Row>
				<Footer />
			</Grid> 
		);
	}

});


module.exports = Login;
