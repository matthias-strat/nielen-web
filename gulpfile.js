var gulp = require('gulp');
var sass = require('gulp-sass');

var paths = {
  styles: {
    src: 'public/stylesheets/*.scss',
    dst: 'public/stylesheets'
  }
}

function style() {
  return (
    gulp
      .src(paths.styles.src)
      .pipe(sass())
      .on("error", sass.logError)
      .pipe(gulp.dest(paths.styles.dst))
  );
}

function watch() {
  style();
  gulp.watch(paths.styles.src, style)
}

exports.style = style;
exports.watch = watch;