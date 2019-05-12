const gulp = require('gulp')
const requireDir = require('require-dir')
const runSequence = require('run-sequence')
const browserSync = require('browser-sync')
const path = require('path')
const watch = require('gulp-watch')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const { scripts, webpackConfig } = require('./task/webpack')

const bs = browserSync.create()
const bundler = webpack(webpackConfig)

requireDir('./task')

gulp.task('build', ['move-assets', 'js', 'pug', 'css', 'svg'])

gulp.task('js', scripts)

gulp.task('watch', () => {
  watch('src/**/*.pug', e => runSequence('pug', bs.reload))
  watch('src/**/*.css', e => runSequence('css', bs.reload))
  watch('src/**/*.svg', e => runSequence('svg', bs.reload))
  watch('src/**/*.js', e => bs.reload())
  watch(['src/assets/images/**/*', 'src/assets/fonts/**/*'], e =>
    runSequence('move-assets', bs.reload)
  )
})

gulp.task('browserSync', () => {
  browserSync.init({
    server: {
      baseDir: path.resolve(__dirname, './dist/')
    },
    middleware: [webpackDevMiddleware(bundler, {
      publicPath: webpackConfig.output.publicPath,
      stats: {
        colors: true
      }
    }), webpackHotMiddleware(bundler)],
    port: 3000,
    open: false
  })
})

gulp.task('default', ['browserSync', 'build', 'watch'])
