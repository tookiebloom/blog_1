/*Bootstrap Classes*/
var Grid = ReactBootstrap.Grid;
var Row = ReactBootstrap.Row;
var Col = ReactBootstrap.Col;

/*Components*/
var Header = require('../components/Header.js');
var BlogRoll = require('../components/BlogRoll.js');
var Suggestions = require('../components/Suggestions.js');
var Footer = require('../components/Footer.js');


/*Stores*/
var BlogStore = require('../stores/BlogStore.js')();

/*context*/
var root_context = BlogStore.getHomeContext();


var Index = React.createClass({

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
			posts: BlogStore.getPosts(),
			tags : BlogStore.getTags()
		}
	},

	render: function() {

		return (
			<Grid>
				<Header />

				<Row className="main-container">
					<Col xs={12} >
						<h1 className="main-title">{root_context.texts.home.tagline}</h1>
					</Col>

					<Col xs={12} md={9} >
						<BlogRoll tags={this.state.tags} posts={this.state.posts} />
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

	_onActionCompleted : function(action, data) {
		console.log('action completed arguments', arguments);
	}

});
module.exports = Index;
