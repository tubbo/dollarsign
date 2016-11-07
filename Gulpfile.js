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
const print = require('gulp-print');

// compiles src/ files into lib/ with babel
gulp.task('compile', function() {
  gulp.src('src/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel({ presets: ['es2015'] }))
    .pipe(concat('nquery.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(print(function(filepath) { return "compiled "+filepath; }))
    .pipe(gulp.dest('lib'));
});

// runs uglifyjs on nquery.js to produce nquery.js.min
gulp.task('compress', function() {
  gulp.src('lib/**/*.js')
    .pipe(uglify())
    .pipe(print(function(filepath) { return "compressed "+filepath; }));
});


// creates .tar.gz package of exportable files
gulp.task('package', function() {
  let config = require('./package.json');
  gulp.src(['./lib/nquery.js', './lib/nquery.min.js', './lib/nquery.map.js', 'README.md'])
    .pipe(tar('nquery-v'+config.version+'.tar'))
    .pipe(gzip())
    .pipe(gulp.dest('./pkg'), { overwrite: true })
    .pipe(print(function(filepath) { return "created package "+filepath; }));
});

gulp.task('docs', function(callback) {
  let config = require('./conf.json');
  gulp.src(['./README.md', 'src/nquery.js'])
    .pipe(jsdoc(config, callback));
});

gulp.task('clean', function() {
  exec('rm -rf docs lib pkg');
});

gulp.task('default', ['clean', 'docs', 'compile', 'compress', 'package']);
