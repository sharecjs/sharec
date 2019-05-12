const gulp = require('gulp')
const browserSync = require('browser-sync')
const imageMin = require('gulp-imagemin')

gulp.task('move-fonts', () => {
  gulp.src('src/assets/fonts/**/*').pipe(gulp.dest('dist/assets/fonts'))
})

gulp.task('optimize-images', () => {
  gulp
    .src('src/assets/images/**/*')
    .pipe(imageMin())
    .pipe(gulp.dest('dist/assets/images'))
    .pipe(browserSync.stream())
})

gulp.task('move-assets', ['move-fonts', 'optimize-images'])
