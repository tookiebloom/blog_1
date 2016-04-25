/*Bootstrap Classes*/
var Grid = ReactBootstrap.Grid;
var Row = ReactBootstrap.Row;
var Col = ReactBootstrap.Col;


var Footer = React.createClass({

	render: function() {
		return (
			<Row className="footer">
				Copyright &copy; @beni & @Lumi
			</Row>
		);
	}

});


module.exports = Footer;
