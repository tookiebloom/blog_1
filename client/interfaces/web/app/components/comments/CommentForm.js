/*Bootstrap Classes*/
var Grid = ReactBootstrap.Grid;
var Row = ReactBootstrap.Row;
var Col = ReactBootstrap.Col;


var CommentForm = React.createClass({

	render: function() {
		return (
			<div className="comment-form">
				<h4>Add a comment:</h4>

				<form action="/" method="post" id="submit-comment-form">
					Answer to: <input min="1" max="100" type="number" name="answer_to" />

					<input type="text" placeholder="Name"  />

					<textarea placeholder="Your comment...">

					</textarea>


					<a className="submit-comment-button" href="#">
						<i className="fa fa-commenting-o" aria-hidden="true"></i>
						Submit
					</a>
				</form>

			</div>
		);
	}

});


module.exports = CommentForm;
