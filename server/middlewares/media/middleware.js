var Promise = require('bluebird');
var fs = require('fs');

module.exports = function(CORE){



	var _validateSingleMediaFile = function(file){

		return new Promise( function( resolve, reject ){

			var _errors = [];
			if( file.size > CORE.config.media_validator.max_size ) {
				_errors.push("The file is larger than the configured amount of " + CORE.config.media_validator.max_size + " bytes or roughly "   + ( CORE.config.media_validator.max_size/1000000 ) + " MB"  );
			}

			if( CORE.config.media_validator.allowed_mimetypes.indexOf( file.mimetype ) == -1 ){
				_errors.push("The file mimetype (" + file.mimetype + ") is not present in the allowed types in the config");
			}

			resolve({
				valid: (_errors.length == 0),
				errors: _errors,
				file : file
			});
		});
	};


	//returns a processed file object
	var _processValidFile = function(validation_result){
		return new Promise(function(resolve, reject){

			var destination_URL = "res/uploads/" + Date.now() + "_"+validation_result.file.originalname;

			var rd = fs.createReadStream(validation_result.file.path);
			rd.on('error', reject);
			var wr = fs.createWriteStream( destination_URL );
			wr.on('error', reject);
			wr.on('finish', function(){

				fs.unlink( validation_result.file.path, function(err){
					if(err) reject(err);

					resolve({
						original_name: validation_result.file.originalname,
						size: validation_result.size,
						url: destination_URL,
						alt: "",
						type: validation_result.mimetype,
						created: Date.now(),
						groups: []
					});

				});
			});
			rd.pipe(wr);
		});
	};

	var _processInvalidFile = function(validation_result){
		return new Promise(function(resolve, reject){

			fs.unlink( validation_result.file.path, function(err){
				if(err) reject(err);

				resolve({
					original_name: validation_result.file.originalname,
					errors: validation_result.errors,
					is_invalid: true
				});
			});

		});
	};


	var _processValidationResult = function(validation_result){

		var processFile = validation_result.valid ? _processValidFile : _processInvalidFile;
		return processFile(validation_result);
	};



	var _validateAndProcessMediaFiles = function(files){

		return new Promise(function(resolve, reject){
			var _valid = [], _invalid = [], i, process_file_promises = [];

			for ( i = 0; i < files.length; i++ ){
				process_file_promises.push(
					_validateSingleMediaFile(files[i])
					.then(  _processValidationResult )
					.then( function( processed_file ){
						var array_to_push = (processed_file.is_invalid ? _invalid : _valid  ) ;
						array_to_push.push( processed_file );
				 }));
			}
			
			Promise.all(process_file_promises)
			.then(function(){
				resolve({
					valid : _valid,
					invalid: _invalid
				});
			})

		});
	};





	return function (req, res, next) {

		req.media = {
			processMediaFiles : _validateAndProcessMediaFiles
		}

		next();
	};
};
