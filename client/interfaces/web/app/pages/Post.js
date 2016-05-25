/*Bootstrap Classes*/
var Grid = ReactBootstrap.Grid;
var Row = ReactBootstrap.Row;
var Col = ReactBootstrap.Col;

/*Components*/
var Header = require('../components/Header.js');
var Suggestions = require('../components/suggestions/Suggestions.js');

var BlogPost = require('../components/blog/BlogPost.js');
var Footer = require('../components/Footer.js');
var CommentRoll = require('../components/comments/CommentRoll.js');


/*constants*/
var Actions = require('../constants/Actions.js');

var PostPage = React.createClass({

	childContextTypes : {
    	media			: React.PropTypes.object,
		tag_color_map	: React.PropTypes.object,
		texts			: React.PropTypes.object
    },

	getChildContext : function(){
		return this.childContext;
	},


	getInitialState : function(){

		this.BlogStore = require('../stores/BlogStore.js')();
		this.childContext = this.BlogStore.getPostContext();


		return {
			post : this.BlogStore.getPost(),
			blog_flags : {
				action_completed : false
			},
			commentSubmitErrors : []
		}
	},

	render: function() {

		return (
			<Grid>
				<Header />

				<Row className="main-container">
					<Col xs={12} >
						<h1 className="main-title">Post page</h1>
					</Col>

					<Col xs={12} md={9} >
						<BlogPost  key={this.state.post._id} postData={this.state.post} isTeaser={false} />
					</Col>

					<Col xs={12} md={3} >
						<Suggestions />
					</Col>


					<CommentRoll commentSubmitErrors={this.state.commentSubmitErrors} flags={this.state.blog_flags} post={this.state.post} />

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
			case Actions.BLOG.COMMENT_SUBMITTED :

				if(response.status == "success") {
					this.setState({
						post : this.BlogStore.getPost(),
						blog_flags : {
							action_completed : Actions.BLOG.COMMENT_SUBMITTED
						},
						commentSubmitErrors : []
					});
				} else {
					this.setState({
						post : this.state.post,
						blog_flags : {
							action_completed : Actions.BLOG.COMMENT_SUBMITTED
						},
						commentSubmitErrors : response.message.split("<|>")
					});
				}

			break;

			default:
				//no op
		}

	}

});
module.exports = PostPage;
