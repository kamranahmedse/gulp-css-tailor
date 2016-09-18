var gulp = require('gulp');
var tailor = require('../index');

var outputDir = __dirname + '/assets';


/** With default options */
gulp.task('default', function () {

  // You may not pass any arguments and CSS file will be generated with the defaults
  gulp.src(__dirname + '/../test/fixtures/**/*.html')
    .pipe(tailor())
    .pipe(gulp.dest(outputDir));
});


gulp.task('default2', function () {

  // Object showing the default parameters and that what you can configure
  gulp.src(__dirname + '/../test/fixtures/**/*.html')
    .pipe(tailor({
      filename: 'tailored.css',
      minifyOutput: false,
      tabSpacing: 2,
      setImportant: false
    }))
    .pipe(gulp.dest(outputDir));

});


gulp.task('minified', function () {

  // Normal minified file
  gulp.src(__dirname + '/../test/fixtures/**/*.html')
    .pipe(tailor({
      filename: 'tailored.min.css',
      minifyOutput: true
    }))
    .pipe(gulp.dest(outputDir));

});


gulp.task('minified2', function () {

  // Minified file with !important flag in the whole CSS
  gulp.src(__dirname + '/../test/fixtures/**/*.html')
    .pipe(tailor({
      filename: 'tailored-imp.min.css',
      minifyOutput: true
    }))
    .pipe(gulp.dest(outputDir));

});


gulp.task('important', function () {

  // Normal file with important flag and changed formatting
  gulp.src(__dirname + '/../test/fixtures/**/*.html')
    .pipe(tailor({
      filename: 'important-tailored.css',
      tabSpacing: 2,        // Used for formatted CSS
      setImportant: true
    }))
    .pipe(gulp.dest(outputDir));

});


