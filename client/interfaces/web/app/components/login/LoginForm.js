/*Bootstrap Classes*/
var Grid = ReactBootstrap.Grid;
var Row = ReactBootstrap.Row;
var Col = ReactBootstrap.Col;


var LoginForm = React.createClass({
	
	getInitialState : function(){
		return {
			validationMessage : this.props.validationMessage
		}
	},


	render: function() {
		return (
			<div className="login-form">
				<h4>Login:</h4>
				<form action="/login/" method="post" id="login_form">

					<input type="email" placeholder="email" name="email" />

					<input type="password" placeholder="Password" name="password" />

					<a className={"login-button"} onClick={this._onButtonClick} > 
						<i className="fa fa-sign-in" aria-hidden="true"></i>
						Login
					</a>
				</form>


				{ this.state.validationMessage && <div className="validation-message">{this.state.validationMessage}</div>}

			</div>
		);
	},


	_onButtonClick : function(e){
		document.getElementById('login_form').submit();
	}

});


module.exports = LoginForm;
