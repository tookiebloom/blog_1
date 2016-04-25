
var variablePassed = 0;



var Contact = React.createClass({
	getInitialState: function() {
		return {variablePassed: 1};
	},

	componentDidMount: function() {
		var self = this;

		setInterval(function(){

			var state = self.state;

			state.variablePassed++;
			self.setState(state);
		}, 1000);
	},

  render: function() {
    return (

      <div className="Contact"> dsadsa
        Hello, world! This is the contact page, next is the comment box:

      </div>
    );
  }

});


module.exports = Contact;
