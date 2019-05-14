const gulp = require('gulp')
const browserSync = require('browser-sync')
const gulpPug = require('gulp-pug')
const getData = require('jade-get-data')
const plumber = require('gulp-plumber')
const plumberErrorHandler = require('gulp-plumber-error-handler')
const filter = require('gulp-filter')
const rename = require('gulp-rename')

const ENV = process.env.NODE_ENV || 'development'

const data = {
  getData: getData('src/data')
}

const classFromProp = (key, value) => {
  if (!value) {
    return null
  }

  return typeof value === 'string' ? value : key
}

gulp.task('pug', () => {
  return gulp
    .src('src/**/*.pug')
    .pipe(
      plumber({
        errorHandler: plumberErrorHandler(
          'Error was occurred during PUG compile'
        )
      })
    )
    .pipe(filter('src/pages/*'))
    .pipe(
      gulpPug({
        basedir: 'src',
        pretty: ENV === 'production',
        locals: {
          cn: props =>
            Object.keys(props)
              .reduce((acc, key, i) => {
                const className = classFromProp(key, props[key])

                return className ? acc.concat(className) : acc
              }, [])
              .join(' ')
        },
        data
      })
    )
    .pipe(
      rename({
        dirname: '.'
      })
    )
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream())
})
