const gulp = require('gulp')
const { serve, reload } = require('./task/serve')
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
  gulp.watch(['src/**/*.css', 'src/**/*.liquid'], gulp.series(css, reload)),
)
gulp.task('watch:svg', () =>
  gulp.watch('src/**/*.svg', gulp.series(svg, reload)),
)
gulp.task('watch:fonts', () =>
  gulp.watch('src/assets/fonts/**/*', gulp.series(fonts, reload)),
)
gulp.task('watch:images', () =>
  gulp.watch('src/assets/images/**/*', gulp.series(images, reload)),
)
gulp.task('watch:html', () =>
  gulp.watch('dist/**/*.html', reload),
)

// Core tasks
gulp.task(
  'watch',
  gulp.parallel(
    'watch:css',
    'watch:svg',
    'watch:fonts',
    'watch:images',
    'watch:html',
  ),
)
gulp.task(
  'build',
  gulp.series('fonts', 'images', 'css', 'svg', 'cname'),
)
gulp.task('default', gulp.series('build', gulp.parallel('serve', 'watch')))
