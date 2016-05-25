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



	var _insert = function(collection, doc){
		return _db.collection(collection).insertAsync(doc);
	};

	var _find = function(collection, query, projection, opts){

		opts = opts || {};
		opts.skip = opts.skip || 0;
		opts.limit = opts.limit || 0;

		return new Promise(function(resolve, reject){

			_db.collection(collection).find(query, projection).skip(opts.skip).limit(opts.limit).toArray(function(err, posts){
				if(err)
					reject("There was an error trying to fetch objects from the database");
				else
					resolve(posts);
			});
		});
	};

	var _delete = function(collection, query){
		return _db.collection(collection).removeAsync(query);
	};

	var _edit = function(collection, query, new_values, projection){
		return _db.collection(collection).updateAsync(query, { $set: new_values}, projection);
	};


	var _findOne = function(collection, query, projection){
		return _db.collection(collection).findOneAsync(query, projection);
	};

	var _looselyEdit = function(collection, query, update_rules, projection){
		return _db.collection(collection).updateAsync( query, update_rules, projection );
	};




	return {
		cleanup : _cleanup,
		insert: _insert,
		find:	_find,
		delete: _delete,
		edit : _edit,
		looselyEdit : _looselyEdit,
		findOne: _findOne
	};
};
