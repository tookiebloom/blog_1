/*Bootstrap Classes*/
var Grid = ReactBootstrap.Grid;
var Row = ReactBootstrap.Row;
var Col = ReactBootstrap.Col;


var Header = React.createClass({

	render: function() {
		return (
			<Row className="header">
				<Col xs={6} >
					<a className="logo-wrapper" href="/">
						<img src="/res/web/img/logo.png" />
					</a>
				</Col>
				<Col xs={6}>
					<div className="header-buttons pull-right">
						<a href="#" className="login header-button" >
							<i className="fa fa-user" />
						</a>
						<a href="#" className="contact header-button" >
							<i className="fa fa-envelope-o" />
						</a>
					</div>
				</Col>
			</Row>
		);
	}

});


module.exports = Header;
