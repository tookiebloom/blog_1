
module.exports = function(CORE){
	//factory for Interface
	return function(){

		var _views = {};

		var _addView = function( view_name, handler ){

			if( typeof view_name !== "string" ){
				throw new Error( "The view could not be added. The view name must be a string! " );
			}

			if( typeof handler !== "function" ){
				throw new Error( "The handler for a view must be a function!" );
			}

			_views[view_name] = {
				name: view_name,
				handler : handler
			};
		};



		var _renderView = function( view_name, data ){

			if( typeof _views[view_name] !== "object" ) {
				throw new Error("The view: '" + view_name + "' could not be rendered. The view is missing from the interface");
			}

			if( typeof _views[view_name].handler !== "function" ) {
				throw new Error("The view: '" + view_name + "' does not have a defined handler.");
			}

			return _views[view_name].handler( data );
		};


		return {
			view : _addView,
			render : _renderView
		};
	};
};
