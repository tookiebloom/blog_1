
module.exports = function(_chs){
	var _rh = this;
	
	
	
	
	
	
	/**
	 * This is the handler for homepage
	 */
	_rh.homepage = function(req, res){
		//res.send("hello homepage handler");
		
		var homepage_content = _chs.dots.homepage({});
		res.send(homepage_content);
	};
	
	
	
	/**
	 * This is the handler for the contact page
	 */
	 _rh.contact = function(req, res){
		res.send("hello to the contact page"); 
	 };
	
	
	
	return _rh;
};