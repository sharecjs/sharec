const gulp = require('gulp')

function fonts(cb) {
  gulp.src('src/assets/fonts/**/*').pipe(gulp.dest('dist/assets/fonts'))
  cb()
}

function images(cb) {
  gulp.src('src/assets/images/**/*').pipe(gulp.dest('dist/assets/images'))
  cb()
}

function cname(cb) {
  gulp.src('CNAME').pipe(gulp.dest('dist'))
  cb()
}

module.exports = {
  fonts,
  images,
  cname,
}
