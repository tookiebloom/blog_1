var gulp = require('gulp');
var source = require('vinyl-source-stream'); // Used to stream bundle for further handling
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var concat = require('gulp-concat');
var rename = require("gulp-rename");

var scss = require('gulp-scss');

gulp.task('browserify', function() {

    var bundler = browserify({
        entries: ['./client/interfaces/web/app/app.js'], // Only need initial file, browserify finds the deps
        transform: [reactify], // We want to convert JSX to normal javascript
        debug: true, // Gives us sourcemapping
        cache: {}, packageCache: {}, fullPaths: true // Requirement of watchify
    });
    var watcher  = watchify(bundler);


	return watcher
	.on('update', function () { // When any files update
		var updateStart = Date.now();
		console.log('Updating!');
		watcher.bundle() // Create new bundle that uses the cache for high performance
		.on('error', function(err){
			console.log(err);
		})
		.pipe(source('app.js'))
	// This is where you add uglifying etc.
		.pipe(rename('bundle.js'))
		.pipe( gulp.dest('./client/res/web') );
		console.log('Updated!', (Date.now() - updateStart) + 'ms');
	})

	.bundle()
	.pipe(source('app.js'))
	.pipe(rename('bundle.js'))
	.pipe( gulp.dest('./client/res/web') );

});

// I added this so that you see how to run two watch tasks
gulp.task('scss', function () {
  return gulp.src('./client/interfaces/web/app/app.scss')
    .pipe(scss().on('error', function(err){
		console.log(err);
	}))
	.pipe(rename('main.css'))
    .pipe(gulp.dest('./client/res/web'));
});

gulp.task('scss:watch', function () {
  gulp.watch('./client/interfaces/web/app/**/*.scss', ['scss']);
});

// Just running the two tasks
gulp.task('default', ['browserify','scss:watch']);
