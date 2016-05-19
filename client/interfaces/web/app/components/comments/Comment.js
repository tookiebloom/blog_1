/*Bootstrap Classes*/
var Grid = ReactBootstrap.Grid;
var Row = ReactBootstrap.Row;
var Col = ReactBootstrap.Col;


var Comment = React.createClass({

	render: function() {
		return (
			<div className="comment">
				<div className="comment-header">
					<span className="comment-portrait">
						<i className="fa fa-user-secret" aria-hidden="true"></i>
					</span>
					<strong className="comment-author">An idiot</strong>
					<a className="comment-number">#2</a>
				</div>

				<div className="comment-body">
					Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
				</div>

				<div className="comment-footer">
					posted by <strong>an idiot</strong> as at <em>Sunday, January 18th, 1970, 12:17:38 AM</em> as response to <a >#2</a>
				</div>

			</div>
		);
	}

});


module.exports = Comment;
