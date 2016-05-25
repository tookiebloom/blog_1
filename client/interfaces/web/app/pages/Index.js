/*Bootstrap Classes*/
var Grid = ReactBootstrap.Grid;
var Row = ReactBootstrap.Row;
var Col = ReactBootstrap.Col;

/*Components*/
var Header = require('../components/Header.js');
var BlogRoll = require('../components/blog/BlogRoll.js');
var Suggestions = require('../components/suggestions/Suggestions.js');
var Footer = require('../components/Footer.js');

/*constants*/
var Actions = require('../constants/Actions.js');

var Index = React.createClass({

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
		this.childContext = this.BlogStore.getHomeContext();
		return {
			posts: this.BlogStore.getPosts(),
			tags : this.BlogStore.getTags(),
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
						<h1 className="main-title">{this.childContext.texts.home.tagline}</h1>
					</Col>

					<Col xs={12} md={9} >
						<BlogRoll flags={this.state.blog_flags} tags={this.state.tags} posts={this.state.posts} />
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
		this.BlogStore.addActionCompletedListener(this._onActionCompleted);
	},

	componentWillUnmount: function() {
		this.BlogStore.removeActionCompletedListener(this._onActionCompleted);
	},

	_onActionCompleted : function(action) {

		switch ( action ) {
			case Actions.BLOG.MORE_POSTS_REQUESTED :
				this.setState({
					posts: this.BlogStore.getPosts(),
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
module.exports = Index;
