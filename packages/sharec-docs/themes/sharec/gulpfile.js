const gulp = require('gulp')
const postcss = require('gulp-postcss')
const cssnano = require('gulp-cssnano')
const plumber = require('gulp-plumber')

const cssTask = (cb) => {
  gulp
    .src('./css/main.css')
    .pipe(plumber())
    .pipe(postcss())
    .pipe(cssnano())
    .pipe(
      gulp.dest('./static/css', {
        overwrite: true,
      }),
    )
  cb()
}

gulp.task('css', cssTask)
gulp.task('watch:css', () => gulp.watch('./css/**/*.css', cssTask))
gulp.task('build', gulp.parallel('css'))
gulp.task('default', gulp.series('build', gulp.parallel('watch:css')))
