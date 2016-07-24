/*Bootstrap Classes*/
var Grid = ReactBootstrap.Grid;
var Row = ReactBootstrap.Row;
var Col = ReactBootstrap.Col;


var ContactInfo = React.createClass({

	render: function() {
		return (
			<Col xs={12} md={3} className="contact-info" >
				<p><i className="fa fa-envelope-o" aria-hidden="true"></i>: beni@hognogi.com</p>
				<p><i className="fa fa-twitter" aria-hidden="true"></i>: @AndreiHognogi</p>
				<p><i className="fa fa-github-alt" aria-hidden="true"></i>: @hognogi</p>
				<p><i className="fa fa-map-marker" aria-hidden="true"></i>: Cluj napoca</p>
				<br /><br/>

				<p>For any any other contact info (like phone number or skype id) please send me a message along with a short descripton about what you want to discuss, and I will send you the relevant info dirrectly</p>
			</Col>
		);
	}

});


module.exports = ContactInfo;
