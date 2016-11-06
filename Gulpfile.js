const gulp = require('gulp');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const concat = require('gulp-concat');
const pump = require('pump');
const uglify = require('gulp-uglify');

gulp.task('compile', function() {
  gulp.src('src/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel({ presets: ['es2015'] }))
    .pipe(concat('nquery.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('pkg'));
});

gulp.task('compress', function(callback) {
  pump(
    [
      gulp.src('pkg/nquery.js'),
      uglify(),
      gulp.dest('pkg')
    ],
    callback
  );
});

gulp.task('default', ['compile', 'compress']);
