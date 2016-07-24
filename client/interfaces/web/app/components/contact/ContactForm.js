/*Bootstrap Classes*/
var Grid = ReactBootstrap.Grid;
var Row = ReactBootstrap.Row;
var Col = ReactBootstrap.Col;



var BlogActions = require('../../actions/BlogActions.js');


/*constants*/
var Actions = require('../../constants/Actions.js');



var validateSubmit = function(state){
	var _errs = [];

	if ( state.messageBody.length < 2 ){
		_errs.push("The message must be longer than 2 characters.");
	}

	if ( state.name.length < 1 ) {
		_errs.push("The name must be at least 1 character long");
	}

	var re = /\S+@\S+\.\S+/;

	if ( !re.test( state.email )) {
		_errs.push("The email is not valid");
	}


	return _errs;
};



var ContactForm = React.createClass({

	getInitialState : function(){
		return {
			flags			: this.props.flags,
			isSubmitting 	: false,
			messageBody 	: "",
			name			: "",
			email 			: "",
			submitErrors	: this.props.messageSubmitErrors,
			submitSuccess	: false
		}
	},




	componentWillReceiveProps: function(nextProps) {

		var _isSubmitting = this.state.isSubmitting &&
								nextProps.flags.action_completed == Actions.BLOG.MESSAGE_SUBMITTED ?
									false : this.state.isSubmitting;

		var _messageBody = this.state.isSubmitting &&
								nextProps.flags.action_completed == Actions.BLOG.MESSAGE_SUBMITTED &&
								nextProps.messageSubmitErrors.length == 0 ?
									"" : this.state.messageBody;

		var _name = this.state.isSubmitting &&
								nextProps.flags.action_completed == Actions.BLOG.MESSAGE_SUBMITTED &&
								nextProps.messageSubmitErrors.length == 0 ?
									"" : this.state.name;


		var _email = this.state.isSubmitting &&
								nextProps.flags.action_completed == Actions.BLOG.MESSAGE_SUBMITTED &&
								nextProps.messageSubmitErrors.length == 0 ?
									"" : this.state.email;


		var _submitErrors = this.state.isSubmitting &&
								nextProps.flags.action_completed == Actions.BLOG.MESSAGE_SUBMITTED ?
									nextProps.messageSubmitErrors : this.state.submitErrors;

		var _submitSuccess = 	this.state.isSubmitting && 
								nextProps.flags.action_completed == Actions.BLOG.MESSAGE_SUBMITTED &&
								nextProps.messageSubmitErrors.length == 0;

		this.setState({
			flags			: this.props.flags,
			isSubmitting 	: _isSubmitting,
			messageBody 	: _messageBody,
			name			: _name,
			email 			: _email,
			submitErrors	: _submitErrors,
			submitSuccess 	: _submitSuccess
		});
	},


	componentDidUpdate : function(prevProps,prevState) {
		var _this = this;
		if(_this.state.submitErrors.length > 0 || _this.state.submitSuccess) {
			setTimeout(function(){
				if(_this.state.submitErrors.length > 0){ //don't update at any cost, to prevent loop
					var _state  = _this.state;
					_state.submitErrors = [];
					_this.setState(_state);
				}


				if( _state.submitSuccess ) {
					var _state  = _this.state;
					_state.submitSuccess = false;
					_this.setState(_state);
				}

			}, 3000);
		}
	},



	render: function() {
		return (
			<div className="contact-form">
				<h4>Send me a message:</h4>
				<form >

					<input  disabled={this.state.isSubmitting}  type="text" placeholder="Name" value={this.state.name}   onChange={this._nameChanged} />
					<input  disabled={this.state.isSubmitting}  type="text" placeholder="Email" value={this.state.email}  onChange={this._emailChanged}   />
					<textarea   disabled={this.state.isSubmitting}  placeholder="Your message..."  value={this.state.messageBody}   onChange={this._messageBodyChanged} ></textarea>
					<span className="textarea-subtext">characters: {this.state.messageBody.length}/2000</span>

					<a className={"submit-message-button"  + (this.state.isSubmitting ? " submitting" : "")} onClick={this._submitComment} >
						<i className="fa fa-commenting-o" aria-hidden="true"></i>
						<i className="fa fa-cog fa-spin fa-3x fa-fw"></i>
						Send
					</a>


					<div className="submit-errors">
						{this.state.submitErrors.map(function(err, i){
							return <span key={i} >{err}</span>
						})}
					</div>

					{this.state.submitSuccess && <div className="submit-success"> 
						Message Sent!
					</div>}

				</form>
			</div>
		);
	},

	_nameChanged : function(e) {
		var _state = this.state;
		_state.name = e.target.value.substring(0,200);
		this.setState(_state);
	},



	_emailChanged : function(e) {
		var _state = this.state;
		_state.email = e.target.value.substring(0,200);
		this.setState(_state);
	},

	_messageBodyChanged : function(e){
		var _state = this.state;
		_state.messageBody = e.target.value.substring(0,2000);
		this.setState(_state);
	},

	_submitComment : function(e){
		var _state 	= this.state,
			_errs 	= validateSubmit(_state);

		if(_state.isSubmitting) return;

		if (_errs.length == 0) {
			_state.isSubmitting = true;


			BlogActions.submitMessage({
				email 		: _state.email,
				body		: _state.messageBody,
				name		: _state.name,
				timestamp	: Date.now()
			});
		} else {
			_state.submitErrors = _errs;
		}
		this.setState(_state);
	}


});


module.exports = ContactForm;
