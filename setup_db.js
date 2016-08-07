var mongoClient = require('mongodb').MongoClient;
var collection = require('mongodb').Collection;

var Promise = require('bluebird');

var extend = require('extend');

var _config = require('./config.js');

var _db, _initialize;

Promise.promisifyAll(collection.prototype);
Promise.promisifyAll(mongoClient);

collection.prototype._find = collection.prototype.find;
collection.prototype.find = function() {
    var cursor = this._find.apply(this, arguments);
    cursor.toArrayAsync = Promise.promisify(cursor.toArray, cursor);
    cursor.countAsync = Promise.promisify(cursor.count, cursor);
    return cursor;
};



mongoClient.connectAsync( _config.mongodb_url +"/" + _config.mongodb_db_name )
	.then(function(db){
		_db = db;
		console.log('The app was connected to the database');

		_initialize();

	}).catch(function(err){
		console.log('Could not connect to the database');
		throw err;
	});


_initialize = function(){

	Promise.all([
		_db.collection("general").removeAsync(),
		_db.collection("media").removeAsync(),
		_db.collection("messages").removeAsync(),
		_db.collection("notifications").removeAsync(),
		_db.collection("posts").removeAsync(),
		_db.collection("users").removeAsync()
	])
	.then(function(removeReports){
		console.log("=====Remove Report==========");
		console.log(removeReports.map(function(report){
			return report.result;
		}));
		console.log("============================");
		console.log("\n\n\nCreating collections\n\n");

		return new Promise(function(resolve, reject){
			_db.createCollection("general", function(){
				resolve();
			});	
		});
	})


	.then(function(){
		console.log('collection: general created successfuly');
		return new Promise(function(resolve, reject){
			_db.createCollection("media", function(){
				resolve();
			});	
		});
	})

	.then(function(){
		console.log('collection: media created successfuly');
		return new Promise(function(resolve, reject){
			_db.createCollection("messages", function(){
				resolve();
			});	
		});
	})

	.then(function(){
		console.log('collection: messages created successfuly');
		return new Promise(function(resolve, reject){
			_db.createCollection("notifications", function(){
				resolve();
			});	
		});
	})

	.then(function(){
		console.log('collection: notifications  created successfuly');
		return new Promise(function(resolve, reject){
			_db.createCollection("posts", function(){
				resolve();
			});	
		});
	})

	.then(function(){
		console.log('collection: posts  created successfuly');
		return new Promise(function(resolve, reject){
			_db.createCollection("users", function(){
				resolve();
			});	
		});
	})

	.then(function(){
		console.log('collection: users  created successfuly');

		return _db.collection("general").insertAsync({
			doc_type: "settings"
		});
	})

	.then(function(){
		console.log('the settings object was added to the general collection');

		return _db.collection("users").insertAsync(extend({
			username	: process.env.OPENSHIFT_BLOG_ADMIN_USERNAME || "admin",
			password	: process.env.OPENSHIFT_BLOG_ADMIN_PASSWORD || "somesecret"
		},_config.admin_user));
	})


	.then(function(){
		console.log('the addmin user was added. The database should be ready for use now.');
		console.log('closing the database');
		_db.close();
	})
	.catch(function(){
		console.log('something went wrong when initiating the database');
		console.log('closing the database');
		_db.close();

	});
};




