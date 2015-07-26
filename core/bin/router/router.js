
module.exports = function(_chs){
	var _router = this;
	_router.route_handlers = require('./route_handlers.js')(_chs);
	
	
	_router.setRoutes = function() {
		_chs.app.get('/',  _router.route_handlers.homepage  );
		_chs.app.get('/contact/', _router.route_handlers.contact );
	};
	
	return _router;	
};