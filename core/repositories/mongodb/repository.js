var mongoClient = require('mongodb').MongoClient;
var collection = require('mongodb').Collection;

var Promise = require('bluebird');

module.exports = function(CORE){

	var _db;

	Promise.promisifyAll(collection.prototype);
	Promise.promisifyAll(mongoClient);

	collection.prototype._find = collection.prototype.find;
	collection.prototype.find = function() {
	    var cursor = this._find.apply(this, arguments);
	    cursor.toArrayAsync = Promise.promisify(cursor.toArray, cursor);
	    cursor.countAsync = Promise.promisify(cursor.count, cursor);
	    return cursor;
	}



	mongoClient.connectAsync( CORE.config.mongodb_url +"/" + CORE.config.mongodb_db_name )
		.then(function(db){
			_db = db;
			console.log('The app was connected to the database');
		}).catch(function(err){
			console.log('Could not connect to the database');
			throw err;
		});


	var _cleanup = function(){
		_db.close();
		console.log("Mongo database closed!");
	};



	var _insert = function(doc, collection){
		return _db.collection(collection).insertAsync(doc);
	};

	var _find = function(opts, collection){

		return new Promise(function(resolve, reject){
			
			_db.collection(collection).find(opts).toArray(function(err, posts){
				if(err)
					reject("There was an error trying to fetch objects from the database")
				else
					resolve(posts);
			});

		});

	}




	return {
		cleanup : _cleanup,
		insert: _insert,
		find:	_find
	};
};
