/*Bootstrap Classes*/
var Grid = ReactBootstrap.Grid;
var Row = ReactBootstrap.Row;
var Col = ReactBootstrap.Col;

/*Components*/
var Header = require('../components/Header.js');
var Suggestions = require('../components/Suggestions.js');

var BlogPost = require('../components/blog/BlogPost.js');
var Footer = require('../components/Footer.js');


/*Stores*/
var BlogStore = require('../stores/BlogStore.js')();

/*context*/
var root_context = BlogStore.getPostContext();

/*constants*/
var Actions = require('../constants/Actions.js');

var PostPage = React.createClass({

	childContextTypes : {
    	media			: React.PropTypes.object,
		tag_color_map	: React.PropTypes.object,
		texts			: React.PropTypes.object
    },

	getChildContext : function(){
		return root_context;
	},


	getInitialState : function(){
		return {
			post : BlogStore.getPost(),
			blog_flags : {
				action_completed : false
			}
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

				</Row>

				<Footer />
			</Grid>
		);
	},

	componentDidMount: function() {
	  BlogStore.addActionCompletedListener(this._onActionCompleted);
	},

	componentWillUnmount: function() {
	  BlogStore.removeActionCompletedListener(this._onActionCompleted);
	},

	_onActionCompleted : function(action) {

		switch ( action ) {
			case Actions.BLOG.MORE_POSTS_REQUESTED :
				this.setState({
					posts: BlogStore.getPosts(),
					tags : this.state.tags,
					blog_flags : {
						action_completed : Actions.BLOG.MORE_POSTS_REQUESTED
					}
				})
			break;

			default:
				//no op
		}

	}

});
module.exports = PostPage;
