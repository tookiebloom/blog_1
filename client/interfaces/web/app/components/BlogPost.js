/*Bootstrap Classes*/
var Grid = ReactBootstrap.Grid;
var Row = ReactBootstrap.Row;
var Col = ReactBootstrap.Col;


var sanitizePostContent = function(state){
	var content = state.content;

	if( state.isTeaser ) {
		img_string = "";

		var image_index = content.indexOf("<img");

		if( image_index != -1 ){
			//avem imagine
			var end_index = content.indexOf("/>", image_index) + 2;

			var img_string = content.substring(image_index, end_index);

		}


		content = content.replace(/<(?:.|\n)*?>/gm, '');

		content += img_string;

		if( content.length > 300 ) {
			content = content.substr(0,300);
			content += ' <a href="#">[read more]</a>';
		}
	}

	return {
		__html : content
	}
}



var BlogPost = React.createClass({
	contextTypes: {
    	media			: React.PropTypes.object,
		tag_color_map	: React.PropTypes.object,
		texts			: React.PropTypes.object
	},

	getInitialState : function(){

		return {
			title : this.props.postData.headline || '',
			meta : this.props.postData.created || '',
			content: this.props.postData.body || '',
			tags: this.props.postData.tags || [],
			primary_image : this.props.postData.primary_image_id ? this.context.media[ this.props.postData.primary_image_id  ] : false,
			isTeaser: this.props.isTeaser
		}
	},

	render: function() {
		var context = this.context;


		return (

			<article className="blog-post">


				<h2>{this.state.title}</h2>
				<div className="post-meta">{this.state.meta}</div>

				{ this.state.primary_image ?
					(<figure >
						<img src={"/" + this.state.primary_image.url} alt={this.state.primary_image.original_name} />
					</figure>):
					null
				}


				<div className="post-content" dangerouslySetInnerHTML={sanitizePostContent( this.state )} />

				<div className="post-buttons">
					<a className="full-post" href="#">
						<i className="fa fa-align-justify"></i>
						View full article
					</a>
					<a className="post-comments-button" href="#">
						<i className="fa fa-comments-o"></i>
						See comments
					</a>
				</div>

				<div className="post-tags">
					{this.state.tags.map(function(tag, i){
						return <a href="#" className={context.tag_color_map[tag] || ''} key={i} >{tag}</a>
					})}
				</div>
			</article>
		);
	}

});


module.exports = BlogPost;
