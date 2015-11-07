//UTILS HELPER
module.exports = function(_config){

	var _splitAndTrim = function(input, separator){

		return input.split(separator).map(function(item){
			return item.trim();
		});
	};


	return {
		splitAndTrim: _splitAndTrim
	};
};
