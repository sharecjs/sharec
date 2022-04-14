const path = require('path')
const browserSync = require('browser-sync')
const gulp = require('gulp')
const svgStore = require('gulp-svgstore')
const svgMin = require('gulp-svgmin')
const plumber = require('gulp-plumber')
const plumberErrorHandler = require('gulp-plumber-error-handler')

function svg(cb) {
  gulp
    .src('src/assets/svg/*.svg')
    .pipe(
      plumber({
        errorHandler: plumberErrorHandler(
          'Error was occurred during SVG compile',
        ),
      }),
    )
    .pipe(
      svgMin(file => {
        return {
          plugins: [
            {
              cleanupIDs: {
                prefix: `${path.basename(
                  file.relative,
                  path.extname(file.relative),
                )}-`,
                minify: true,
              },
            },
          ],
        }
      }),
    )
    .pipe(svgStore({ inlineSvg: true }))
    .pipe(gulp.dest('dist/assets/svg'))
    .pipe(browserSync.stream())
  cb()
}

module.exports = {
  svg,
}
