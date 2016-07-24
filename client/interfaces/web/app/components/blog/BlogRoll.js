/*Bootstrap Classes*/
var Grid = ReactBootstrap.Grid;
var Row = ReactBootstrap.Row;
var Col = ReactBootstrap.Col;


var BlogPost = require('./BlogPost.js');

var BlogActions = require('../../actions/BlogActions.js');


/*constants*/
var Actions = require('../../constants/Actions.js');


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
			posts			: this.props.posts,
			tags			: this.props.tags,
			isLoading 		: false,
			pageIndex 		: 0,
			pendingPage		: false,
			preventLoadMore : false
		}
	},


	componentWillReceiveProps: function(nextProps) {

		var _isLoading 	 		= 	this.state.pendingPage &&
					 	  			nextProps.flags.action_completed == Actions.BLOG.MORE_POSTS_REQUESTED ?
						  				false : this.state.isLoading,

			_pendingPage 		= 	this.state.pendingPage &&
						 			nextProps.flags.action_completed == Actions.BLOG.MORE_POSTS_REQUESTED ?
							 			false : this.state.pendingPage,

			_pageIndex	 		= 	this.state.pendingPage &&
						 			nextProps.flags.action_completed == Actions.BLOG.MORE_POSTS_REQUESTED ?
										this.state.pendingPage : this.state.pageIndex,

			_preventLoadMore 	= 	this.state.pendingPage &&
						 			nextProps.flags.action_completed == Actions.BLOG.MORE_POSTS_REQUESTED &&
									this.state.posts.length == nextProps.posts.length ?
										true : this.state.preventLoadMore;


		this.setState({
			posts			: nextProps.posts,
			tags			: nextProps.tags,
			isLoading 		: _isLoading,
			pageIndex 		: _pageIndex,
			pendingPage		: _pendingPage,
			preventLoadMore	: _preventLoadMore
		});
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
						<div className="tags-wrapper" >
							{tags.map(function(tag, i){
								return <a className={"tag-button " + (context.tag_color_map[tag.name] || '')}  href={"/t/"+tag.name} key={i}>{tag.name}</a>
							})}
						</div>
					</div>

					<div className="post-list">
						{posts.map(function(post){
							return <BlogPost key={post._id} postData={post} isTeaser={true} />
						})}
					</div>

					<div className={"load-more" + (this.state.preventLoadMore ? ' hidden' : '')}>
						<a href="" onClick={this._loadMore} className={"load-more-button" + (this.state.isLoading ? ' active' : '')}>
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

		var _state = this.state;
		_state.isLoading = true;
		_state.pendingPage = _state.pageIndex + 1;

		this.setState(_state);
		BlogActions.requestMorePosts(_state.pendingPage);
	}
});


module.exports = BlogRoll;
