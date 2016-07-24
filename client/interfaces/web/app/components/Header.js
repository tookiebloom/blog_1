/*Bootstrap Classes*/
var Grid = ReactBootstrap.Grid;
var Row = ReactBootstrap.Row;
var Col = ReactBootstrap.Col;


var Header = React.createClass({

	getInitialState : function(){
		return {
			auth: this.props.auth || {}
		}
	},


	render: function() {
		return (
			<Row className="header">
				<Col xs={4} >
					<a className="logo-wrapper" href="/">
						<img src="/res/web/img/logo.png" />
					</a>
				</Col>
				<Col xs={8}>


				

					<div className="header-buttons pull-right">
						<a href="/contact/" className="contact header-button" >
							<i className="fa fa-envelope-o" />
						</a>
					</div>

					<div className="header-buttons pull-right">


						<a href="https://twitter.com/AndreiHognogi" className="header-button twitter" >
							<i className="fa fa-twitter-square" aria-hidden="true"></i>
						</a> 
						<br />

						
						<a href="https://github.com/hognogi"  className="header-button github" >
							<i className="fa fa-github" aria-hidden="true"></i>
						</a>
					</div>

					{this.state.auth.token && <div className="header-buttons pull-right"> 
						<a href="/?setinterface=admin" className="login header-button" >
							<i className="fa fa-unlock-alt" aria-hidden="true"></i>
						</a>
					</div>}


				</Col>
			</Row>
		);
	}

});


module.exports = Header;
