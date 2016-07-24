/*Bootstrap Classes*/
var Grid = ReactBootstrap.Grid;
var Row = ReactBootstrap.Row;
var Col = ReactBootstrap.Col;

var Comment = require('./Comment.js');
var CommentForm = require('./CommentForm.js');

const Events = require('events');

var _comments_event_bus = new Events.EventEmitter();

var getCommentReplies = function(comments, comment_id, level, parent) {
	var _replies = [], i;

	for(i = 0; i < comments.length; i++){
		if( comments[i].answer_to == comment_id ) {
			_replies.push({
				answer_to : comments[i].answer_to,
				body : comments[i].body,
				timestamp : comments[i].timestamp,
				name : comments[i].name,
				level : (level > 10? 10 : level),
				id 	: comments[i].id,
				banned : comments[i].banned,
				ban_reason : comments[i].ban_reason,
				parent	: parent
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

	var _stack = getCommentReplies(unsortedComments,"", 0, false).reverse();

	while( crtNode =  _stack.pop() ) {
		sortedComments.push(crtNode);
		reversedCommentReplies = getCommentReplies(unsortedComments, crtNode.id, crtNode.level+1,{
			index: sortedComments.length,
			name : crtNode.name
		}).reverse();
		if ( reversedCommentReplies.length > 0 ) {
			_stack = _stack.concat( reversedCommentReplies );
		}
	}


	//now the unsorted comments;
	for ( i=0; i < unsortedComments.length; i++ ) {
		if( !unsortedComments[i].wasSorted ){
			sortedComments.push({
				answer_to : unsortedComments[i].answer_to,
				body : unsortedComments[i].body,
				timestamp : unsortedComments[i].timestamp,
				name : unsortedComments[i].name,
				level : 0,
				parent_index : 0,
				parent	: false
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
			<Col id="comments" xs={12} md={9}>
				{comments.length > 0?  <div  className="comment-list">

					<h3>Comments:</h3>
					{comments.map(function(comment, i){
						return <Comment key={i} commentsEventBus={_comments_event_bus} comment={comment} index={i+1}/>
					})}
				</div> : null}
				<CommentForm commentsEventBus={_comments_event_bus} commentSubmitErrors={this.state.commentSubmitErrors} post={this.state.post} flags={this.state.flags} />

			</Col>



		);
	}

});


module.exports = CommentRoll;
