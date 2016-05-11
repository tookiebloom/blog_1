/*Bootstrap Classes*/
var Grid = ReactBootstrap.Grid;
var Row = ReactBootstrap.Row;
var Col = ReactBootstrap.Col;


var CommentRoll = React.createClass({

	render: function() {
		return (
			<Row className="footer">
				<div className="content">
					<span>Copyright &copy; @beni</span>
					<a href="#">some link!</a>
				</div>
			</Row>
		);
	}

});


module.exports = Footer;
