





var CommentBox = React.createClass({

	getInitialState: function(){
		return {variablePassed: this.props.passedValue};
	},


	componentWillReceiveProps: function(nextProps) {
		  console.log(nextProps);

		  this.setState({ variablePassed:nextProps.passedValue})
	},

	render: function() {
		return (

			<div className="commentBox">
				Hello, world! test modific automat I am a CommentBox in a different file!. test modificat {this.state.variablePassed }
			</div>
		);
	}

});


module.exports = CommentBox;
