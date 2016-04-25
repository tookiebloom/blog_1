/*Bootstrap Classes*/
var Grid = ReactBootstrap.Grid;
var Row = ReactBootstrap.Row;
var Col = ReactBootstrap.Col;


var Suggestions = React.createClass({

	render: function() {
		return (
			<div className="suggestions">


				<h3>Most relevant posts</h3>

				<h4>Programming:</h4>
				<a href="#">Script Master race article </a>
				<a href="#">Moer Programming stuff!</a>
				<a href="#">To program or not to program? this is the question! </a>
				<a href="#">Obligatory Lumisor  post</a>

				<h4>Javascript:</h4>

				<a href="#">Is Javascript really that great?</a>
				<a href="#">What if not?</a>
				<a href="#">What Javascript is and what javascript is not</a>
				<a href="#">More lumisor  ofc</a>
				<a href="#">There is no Javascript only </a>
			</div>
		);
	}

});


module.exports = Suggestions;
