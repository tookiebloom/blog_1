/*Bootstrap Classes*/
var Grid = ReactBootstrap.Grid;
var Row = ReactBootstrap.Row;
var Col = ReactBootstrap.Col;


var BlogPost = require('./BlogPost.js');

var BlogActions = require('../actions/BlogActions.js');


var BlogRoll = React.createClass({

	contextTypes: {
    	media			: React.PropTypes.object,
		tag_color_map	: React.PropTypes.object,
		texts			: React.PropTypes.object
	},

	childContextTypes : {
    	media			: React.PropTypes.object,
		tag_color_map	: React.PropTypes.object,
		texts			: React.PropTypes.object
    },

	getChildContext : function(){
		return this.context;
	},

	getInitialState : function(){
		return {
			posts	: this.props.posts,
			tags	: this.props.tags
		}
	},

	render: function() {

		var posts 		= this.state.posts;
		var tags		= this.state.tags;
		var context 	= this.context;



		return (
			<Row className="blog-roll">

				<Col xs={12}>

					<div className="tags">
						<h5>Main tags:</h5>
						<div className="tags-wrapper">
							{tags.map(function(tag, i){
								return <a className={"tag-button " + (context.tag_color_map[tag.name] || '')}  href="#" key={i}>{tag.name}</a>
							})}
						</div>
					</div>

					<div className="post-list">
						{posts.map(function(post){
							return <BlogPost key={post._id} postData={post} isTeaser={true} />
						})}
					</div>

					<div className="load-more">
						<a href="" onClick={this._loadMore} className="load-more-button ">
							<i className="fa  fa-refresh"></i>
							<span className="active-label">Loading...</span>
							<span className="passive-label">Load more</span>
						</a>
					</div>



				</Col>
			</Row>
		);
	},


	_loadMore : function(evt){
		evt.preventDefault();
		console.log('doing action');

		BlogActions.doAction("passed text from blogRoll");
	}
});


module.exports = BlogRoll;
