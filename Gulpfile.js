const gulp = require('gulp');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const concat = require('gulp-concat');
const pump = require('pump');
const uglify = require('gulp-uglify');
const tar = require('gulp-tar');
const gzip = require('gulp-gzip');
const jsdoc = require('gulp-jsdoc3');
const exec = require('gulp-exec');

gulp.task('compile', function() {
  gulp.src('src/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel({ presets: ['es2015'] }))
    .pipe(concat('nquery.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('pkg'));
});

gulp.task('compress', function() {
  pump(
    [
      gulp.src('pkg/nquery.js'),
      uglify(),
      gulp.dest('pkg')
    ],
    callback
  );
});

gulp.task('package', function() {
  gulp.src('./pkg/*')
    .pipe(tar('nquery.tar'))
    .pipe(gzip())
    .pipe(gulp.dest('.'));
});

gulp.task('docs', function(callback) {
  let config = require('./conf.json');
  gulp.src(['./README.md', 'src/nquery.js'])
    .pipe(exec('rm -rf docs'))
    .pipe(jsdoc(config, callback));
});

gulp.task('default', ['compile', 'compress', 'package']);
