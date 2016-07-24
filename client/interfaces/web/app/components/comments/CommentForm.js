/*Bootstrap Classes*/
var Grid = ReactBootstrap.Grid;
var Row = ReactBootstrap.Row;
var Col = ReactBootstrap.Col;


var BlogActions = require('../../actions/BlogActions.js');


/*constants*/
var Actions = require('../../constants/Actions.js');



var validateSubmit = function(state){
	var _errs = [];

	if ( state.commentBody.length < 2 ){
		_errs.push("The comment must be longer than 2 characters.");
	}

	if ( state.name.length < 1 ) {
		_errs.push("The name must be at least 1 character long");
	}

	return _errs;
};


var CommentForm = React.createClass({

	getInitialState : function(){
		return {
			post			: this.props.post,
			flags			: this.props.flags,
			isSubmitting 	: false,
			commentBody 	: "",
			name			: "",
			answerIndex		: "",
			submitErrors	: this.props.commentSubmitErrors,
			event_bus		: this.props.commentsEventBus
		}
	},


	componentWillReceiveProps: function(nextProps) {

		var _isSubmitting = this.state.isSubmitting &&
								nextProps.flags.action_completed == Actions.BLOG.COMMENT_SUBMITTED ?
									false : this.state.isSubmitting;

		var _commentBody = this.state.isSubmitting &&
								nextProps.flags.action_completed == Actions.BLOG.COMMENT_SUBMITTED ?
									"" : this.state.commentBody;

		var _commentBody = this.state.isSubmitting &&
								nextProps.flags.action_completed == Actions.BLOG.COMMENT_SUBMITTED &&
								nextProps.commentSubmitErrors.length == 0 ?
									"" : this.state.commentBody;

		var _name = this.state.isSubmitting &&
								nextProps.flags.action_completed == Actions.BLOG.COMMENT_SUBMITTED &&
								nextProps.commentSubmitErrors.length == 0 ?
									"" : this.state.name;


		var _answerIndex = this.state.isSubmitting &&
								nextProps.flags.action_completed == Actions.BLOG.COMMENT_SUBMITTED &&
								nextProps.commentSubmitErrors.length == 0 ?
									"" : this.state.answerIndex;


		var _submitErrors = this.state.isSubmitting &&
								nextProps.flags.action_completed == Actions.BLOG.COMMENT_SUBMITTED ?
									nextProps.commentSubmitErrors : this.state.submitErrors;
		this.setState({
			post			: nextProps.post,
			flags			: nextProps.flags,
			isSubmitting	: _isSubmitting,
			commentBody		: _commentBody,
			name			: _name,
			answerIndex		: _answerIndex,
			submitErrors	: _submitErrors,
			event_bus		: nextProps.commentsEventBus
		});
	},

	componentDidUpdate : function(prevProps,prevState) {
		var _this = this;
		if(_this.state.submitErrors.length > 0) {
			setTimeout(function(){
				if(_this.state.submitErrors.length > 0){ //don't update at any cost, to prevent loop
					var _state  = _this.state;
					_state.submitErrors = [];
					_this.setState(_state);
				}
			}, 3000);
		}
	},

	render: function() {
		return (
			<div className="comment-form">
				<h4>Add a comment:</h4>

				<form action="/" method="post" id="submit-comment-form">
					Answer to: <input min="1"  disabled={this.state.isSubmitting} max={this.state.post.comments.length} value={this.state.answerIndex} onChange={this._answerIndexChanged} type="number"  />

					<input type="text"  disabled={this.state.isSubmitting} placeholder="Name" value={this.state.name} onChange={this._nameChanged} />

					<textarea  disabled={this.state.isSubmitting} placeholder="Your comment..." value={this.state.commentBody} onChange={this._commentBodyChanged}></textarea>
					<span className="textarea-subtext">characters: {this.state.commentBody.length}/2000</span>


					<a className={"submit-comment-button" + (this.state.isSubmitting ? " submitting" : "")} onClick={this._submitComment}>
						<i className="fa fa-commenting-o" aria-hidden="true"></i>
						<i className="fa fa-cog fa-spin fa-3x fa-fw"></i>
						Submit
					</a>

					<div className="submit-errors">
						{this.state.submitErrors.map(function(err, i){
							return <span key={i} >{err}</span>
						})}
					</div>
				</form>

			</div>
		);
	},
	componentDidMount: function() {
		this.state.event_bus.on(Actions.BLOG.ANSWER_INDEX_SELECTED, this._answerIndexChangedExternally)
	},

	componentWillUnmount: function() {
		this.state.event_bus.removeListener(Actions.BLOG.ANSWER_INDEX_SELECTED, this._answerIndexChangedExternally);
	},

	_answerIndexChanged : function(e) {
		var _state = this.state;
		var _answer_index = parseInt( e.target.value );
		if( _answer_index < 1 || _answer_index > _state.post.comments.length ) _answer_index = "";
		_state.answerIndex = _answer_index;
		this.setState(_state);
	},

	_answerIndexChangedExternally : function(answer_index) {
		var _state = this.state;
		var _answer_index = parseInt( answer_index );
		if( _answer_index < 1 || _answer_index > _state.post.comments.length ) _answer_index = "";
		_state.answerIndex = _answer_index;
		this.setState(_state);
	},

	_commentBodyChanged : function(e){
		var _state = this.state;
		_state.commentBody = e.target.value.substring(0,2000);
		this.setState(_state);
	},

	_nameChanged : function(e) {
		var _state = this.state;
		_state.name = e.target.value.substring(0,200);
		this.setState(_state);
	},

	_submitComment : function(e){
		var _state 	= this.state,
			_errs 	= validateSubmit(_state);

		if(_state.isSubmitting) return;

		if (_errs.length == 0) {
			_state.isSubmitting = true;

			var _answer_index = parseInt( _state.answerIndex ) -1,
				_answer_to = "";

			if( !isNaN( _answer_index ) && typeof _state.post.comments[_answer_index] !== "undefined" ) {
				_answer_to = _state.post.comments[_answer_index].id;
			}

			BlogActions.submitComment(_state.post._id, {
				answer_to 	: _answer_to,
				body		: _state.commentBody,
				name		: _state.name,
				timestamp	: Date.now()
			});
		} else {
			_state.submitErrors = _errs;
		}
		this.setState(_state);
	}





});


module.exports = CommentForm;
