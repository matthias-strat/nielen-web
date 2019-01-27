var gulp          = require('gulp'),
    sass          = require('gulp-sass'),
    sourceMaps    = require('gulp-sourcemaps'),
    cleanCss      = require('gulp-clean-css'),
    postCss       = require('gulp-postcss'),
    rename        = require('gulp-rename'),
    autoprefixer  = require('autoprefixer');

var paths = {
  styles: {
    src: 'scss/*.scss',
    dst: 'public/stylesheets'
  }
};  

var sassIncludes = ['./node_modules'];

function buildCss() {
  return gulp.src([paths.styles.src])
    .pipe(sourceMaps.init())
    .pipe(sass({includePaths: sassIncludes}))
    .pipe(sass().on('error', sass.logError))
    .pipe(postCss([ autoprefixer({ browsers: [
      'Chrome >= 35',
      'Firefox >= 38',
      'Edge >= 12',
      'Explorer >= 10',
      'iOS >= 8',
      'Safari >= 8',
      'Android 2.3',
      'Android >= 4',
      'Opera >= 12']})]))
    .pipe(sourceMaps.write())
    .pipe(gulp.dest(paths.styles.dst))
    .pipe(cleanCss())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(paths.styles.dst))
}

function watcher() {
  gulp.watch([paths.styles.src], gulp.series(buildCss));
}

exports.watch = gulp.series(buildCss, watcher);
exports.default = gulp.series(buildCss);