var gulp = require('gulp'),
    mocha = require('gulp-mocha');


gulp.task('test', function() {
  return gulp.src('test.js')
      .pipe(mocha({
        reporter: 'nyan',
        clearRequireCache: true,
        ignoreLeaks: true
      }))
      .once('end', function() {
        process.exit();
      });
});


gulp.task('default', ['test']);
