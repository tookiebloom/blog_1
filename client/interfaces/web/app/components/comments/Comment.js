/*Bootstrap Classes*/
var Grid = ReactBootstrap.Grid;
var Row = ReactBootstrap.Row;
var Col = ReactBootstrap.Col;



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
			index 		: this.props.comment.index,
			level		: this.props.comment.level,
			name		: this.props.comment.name,
			body		: this.props.comment.body,
			date		: date,
			answer_to	: this.props.comment.answer_to
		}
	},



	render: function() {
		var commentAttributes = {};
		if( this.state.level > 0 ){
			commentAttributes["data-level"] = this.state.level;
		}

		return (
			<div className="comment" {...commentAttributes} >
				<div className="comment-header">
					<span className="comment-portrait">
						<i className="fa fa-user-secret" aria-hidden="true"></i>
					</span>
					<strong className="comment-author">{this.state.name}</strong>
					<a className="comment-number">#{this.state.index}</a>
				</div>

				<div className="comment-body">
					{this.state.body}
				</div>

				<div className="comment-footer">
					posted by <strong>{this.state.name} </strong>
					 at <em>{this.state.date} </em>

					{ ((this.state.answer_to+"").length > 0) &&
						<span>
							as a response to <a>#{this.state.answer_to}</a>
						</span>
					}

				</div>

			</div>
		);
	}

});


module.exports = Comment;
