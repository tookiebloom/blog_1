/*Bootstrap Classes*/
var Grid = ReactBootstrap.Grid;
var Row = ReactBootstrap.Row;
var Col = ReactBootstrap.Col;

var Comment = require('./Comment.js');
var CommentForm = require('./CommentForm.js');


var CommentRoll = React.createClass({

	render: function() {
		return (
			<Col xs={12} md={9}>



				<div className="comment-list">

					<h3>Comments:</h3>

					<Comment />
					<Comment />
					<Comment />
					<Comment />
					<Comment />
				</div>


				<CommentForm />

			</Col>




		);
	}

});


module.exports = CommentRoll;
