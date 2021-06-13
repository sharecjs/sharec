'use strict'

const gulp = require('gulp')
const mocha = require('gulp-mocha')
const istanbul = require('gulp-istanbul')

gulp.task('coverage', function () {
  return gulp.src(['index.js', 'lib/*.js']).pipe(istanbul()).pipe(istanbul.hookRequire())
})

gulp.task('test', ['coverage'], function () {
  return gulp
    .src('test/*.js')
    .pipe(mocha({ reporter: 'spec' }))
    .pipe(istanbul.writeReports())
})

gulp.task('default', ['test'])
