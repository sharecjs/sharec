const gulp = require('gulp')
const { serve } = require('./task/serve')
const { css } = require('./task/css')
const { svg } = require('./task/svg')
const { fonts, cname, images } = require('./task/static')

// Common tasks
gulp.task('css', css)
gulp.task('svg', svg)
gulp.task('images', images)
gulp.task('fonts', fonts)
gulp.task('cname', cname)
gulp.task('serve', serve)

// Watch tasks
gulp.task('watch:css', () =>
  gulp.watch(['src/**/*.css', 'src/**/*.liquid'], css),
)
gulp.task('watch:svg', () =>
  gulp.watch('src/**/*.svg', svg),
)
gulp.task('watch:fonts', () =>
  gulp.watch('src/assets/fonts/**/*', fonts),
)
gulp.task('watch:images', () =>
  gulp.watch('src/assets/images/**/*', images),
)

// Core tasks
gulp.task(
  'watch',
  gulp.parallel(
    'watch:css',
    'watch:svg',
    'watch:fonts',
    'watch:images',
  ),
)
gulp.task(
  'build',
  gulp.series('fonts', 'images', 'css', 'svg', 'cname'),
)
gulp.task('default', gulp.series('build', gulp.parallel('serve', 'watch')))
