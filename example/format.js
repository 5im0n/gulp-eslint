'use strict';

// npm install gulp gulp-eslint

var gulp = require('gulp');
var eslint = require('../');


gulp.task('eslint-formatter', function() {
	// lint each file, and format all files at once (mul)
	return gulp.src('../test/fixtures/**/*.js')
		.pipe(eslint())
		// use eslint's default formatter by default
		.pipe(eslint.format())
		// Name a built-in formatter or path load.
		// http://eslint.org/docs/user-guide/command-line-interface#f-format
		.pipe(eslint.format('compact'));
});


gulp.task('custom-formatter', function() {

	function embolden(text) {
		return '\u001b[1m' + text + '\u001b[22m ';
	}

	function pluralish(count, text) {
		return count + ' ' + text + (count === 1 ? '' : 's');
	}

	return gulp.src('../test/fixtures/**/*.js')
		.pipe(eslint())
		.pipe(eslint.format(function(results) {

			// return formatted text to display
			return embolden('[Custom ESLint Summary]')
				+ pluralish(results.length, 'File') + ', '
				+ pluralish(results.errorCount, 'Error') + ', and '
				+ pluralish(results.warningCount, 'Warning');
		}));
});

gulp.task('default', ['eslint-formatter','custom-formatter']);
