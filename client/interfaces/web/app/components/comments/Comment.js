/*Bootstrap Classes*/
var Grid = ReactBootstrap.Grid;
var Row = ReactBootstrap.Row;
var Col = ReactBootstrap.Col;


/*constants*/
var Actions = require('../../constants/Actions.js');



var DateFormat = require('dateformat');

var Comment = React.createClass({

	getInitialState : function(){

		var date = "-";
		var stamp =  parseInt(this.props.comment.timestamp)/1000 ;

		try {
			date = DateFormat((new Date(stamp), "dddd, mmmm dS, yyyy, h:MM:ss TT"));
		} catch(e) {
			console.log('invalid date from stamp:', this.props.comment.timestamp)
		}

		return {
			index 		: this.props.index,
			level		: this.props.comment.level,
			name		: this.props.comment.name,
			body		: this.props.comment.body,
			date		: date,
			answer_to	: this.props.comment.answer_to,
			parent		: this.props.comment.parent,
			event_bus 	: this.props.commentsEventBus,
			banned		: this.props.comment.banned,
			ban_reason	: this.props.comment.ban_reason
		}
	},



	componentWillReceiveProps: function(nextProps) {


		var date = "-";
		var stamp =  parseInt(nextProps.comment.timestamp)/1000 ;

		try {
			date = DateFormat((new Date(stamp), "dddd, mmmm dS, yyyy, h:MM:ss TT"));
		} catch(e) {
			console.log('invalid date from stamp:', nextProps.comment.timestamp)
		}


		this.setState({
			index 		: nextProps.index,
			level		: nextProps.comment.level,
			name		: nextProps.comment.name,
			body		: nextProps.comment.body,
			date		: date,
			answer_to	: nextProps.comment.answer_to,
			parent		: nextProps.comment.parent,
			event_bus	: nextProps.commentsEventBus,
			banned		: nextProps.comment.banned,
			ban_reason	: nextProps.comment.ban_reason
		});
	},

	_onIndexClick : function(evt) {
		this.state.event_bus.emit( Actions.BLOG.ANSWER_INDEX_SELECTED, evt.currentTarget.getAttribute('data-index') );
		window.location.hash = "#submit-comment-form";
	},



	render: function() {

		var commentAttributes = {};
		if( this.state.level > 0 ){
			commentAttributes["data-level"] = this.state.level;
		}


		if( this.state.banned) {
			return (
			 	<div id={"comment_" + (this.state.index-1)} className="comment" {...commentAttributes} >
					<div className="comment-footer">
						banned for <strong>{this.state.ban_reason} </strong>
					</div>
				</div>
			);
		}

		return (
		 	<div id={"comment_" + (this.state.index-1)} className="comment" {...commentAttributes} >
				<div className="comment-header">
					<span className="comment-portrait">
						<i className="fa fa-user-secret" aria-hidden="true"></i>
					</span>
					<strong className="comment-author">{this.state.name}</strong>
					<a className="comment-number" data-index={this.state.index} onClick={this._onIndexClick}>#{this.state.index}</a>
				</div>

				<div className="comment-body">
					{this.state.body}
				</div>

				<div className="comment-footer">
					posted by <strong>{this.state.name} </strong>
					 at <em>{this.state.date} </em>

					{ this.state.parent &&
						<span>
							as a response to <a href={"#comment_" + this.state.parent.index }>#{this.state.parent.index} (by: {this.state.parent.name})</a>
						</span>
					}

				</div>

			</div>
		);
	}

});


module.exports = Comment;
