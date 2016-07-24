/*Bootstrap Classes*/
var Grid = ReactBootstrap.Grid;
var Row = ReactBootstrap.Row;
var Col = ReactBootstrap.Col;

/*Components*/
var Header 		= require('../components/Header.js');
var Footer 		= require('../components/Footer.js');
var ContactInfo = require('../components/contact/ContactInfo.js');
var ContactForm = require('../components/contact/ContactForm.js');
var Bio 		= require('../components/contact/Bio.js');
/*constants*/
var Actions = require('../constants/Actions.js');



var Contact = React.createClass({


	getInitialState: function() {

		this.BlogStore = require('../stores/BlogStore.js')();

		return {
			blog_flags : {
				action_completed : false
			},
			messageSubmitErrors : []
		};
	},


	render: function() {

		return (
			<Grid className="contact-page">
				<Header />

				<Row>

					<ContactInfo />

					<Col xs={12} md={9}  className="main-container" >
						<Bio />
						<ContactForm flags={this.state.blog_flags} messageSubmitErrors={this.state.messageSubmitErrors} />
					</Col>

				</Row>
				<Footer />
			</Grid>
		);
	},


	componentDidMount: function() {
		this.BlogStore.addActionCompletedListener(this._onActionCompleted);
	},

	componentWillUnmount: function() {
		this.BlogStore.removeActionCompletedListener(this._onActionCompleted);
	},

	_onActionCompleted : function(action, response) {

		switch ( action ) {
			case Actions.BLOG.MESSAGE_SUBMITTED :

				if(response.status == "success") {
					this.setState({
						blog_flags : {
							action_completed : Actions.BLOG.MESSAGE_SUBMITTED
						},
						messageSubmitErrors : []
					});
				} else {
					this.setState({
						blog_flags : {
							action_completed : Actions.BLOG.MESSAGE_SUBMITTED
						},
						messageSubmitErrors : response.message.split("<|>")
					});
				}

			break;

			default:
				//no op
		}

	}



});


module.exports = Contact;
