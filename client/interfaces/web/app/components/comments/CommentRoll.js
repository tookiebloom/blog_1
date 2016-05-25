/*Bootstrap Classes*/
var Grid = ReactBootstrap.Grid;
var Row = ReactBootstrap.Row;
var Col = ReactBootstrap.Col;

var Comment = require('./Comment.js');
var CommentForm = require('./CommentForm.js');

var getCommentReplies = function(comments, index, level) {
	var _replies = [], i;

	for(i = 0; i < comments.length; i++){
		if( comments[i].answer_to == index ) {
			_replies.push({
				index: (i+1),
				answer_to : comments[i].answer_to,
				body : comments[i].body,
				timestamp : comments[i].timestamp,
				name : comments[i].name,
				level : (level > 10? 10 : level),
				id 	: comments[i].id
			});
			comments[i].wasSorted = true;
		}
	}
	return _replies;
};


var processPostComments = function(post){
	var unsortedComments = [].concat(post.comments),
		sortedComments = [],
		crtNode, reversedCommentReplies, i;

	var _stack = getCommentReplies(unsortedComments,"", 0).reverse();

	while( crtNode =  _stack.pop() ) {
		sortedComments.push(crtNode);
		reversedCommentReplies = getCommentReplies(unsortedComments, crtNode.index, crtNode.level+1).reverse();
		if ( reversedCommentReplies.length > 0 ) {
			_stack = _stack.concat( reversedCommentReplies );
		}
	}


	//now the unsorted comments;
	for ( i=0; i < unsortedComments.length; i++ ) {
		if( !unsortedComments[i].wasSorted ){
			sortedComments.push({
				index: (i+1),
				answer_to : unsortedComments[i].answer_to,
				body : unsortedComments[i].body,
				timestamp : unsortedComments[i].timestamp,
				name : unsortedComments[i].name,
				level : 0
			});
		}
	}


	post.comments = sortedComments;
};



var CommentRoll = React.createClass({
	getInitialState : function(){

		processPostComments(this.props.post);

		return {
			post				: this.props.post,
			flags				: this.props.flags,
			commentSubmitErrors	: this.props.commentSubmitErrors
		}
	},

	componentWillReceiveProps: function(nextProps) {
		processPostComments(nextProps.post);

		this.setState({
			post				: nextProps.post,
			flags				: nextProps.flags,
			commentSubmitErrors	: nextProps.commentSubmitErrors
		});
	},

	render: function() {
		var comments = this.state.post.comments;

		return (
			<Col xs={12} md={9}>
				{comments.length > 0?  <div  className="comment-list">

					<h3>Comments:</h3>
					{comments.map(function(comment, i){
						return <Comment key={i} comment={comment}/>
					})}
				</div> : null}
				<CommentForm commentSubmitErrors={this.state.commentSubmitErrors} post={this.state.post} flags={this.state.flags} />

			</Col>



		);
	}

});


module.exports = CommentRoll;
