const path = require('path')
const webpack = require('webpack')

const ENV = process.env.NODE_ENV || 'development'
const SOURCES_PATH = path.resolve(__dirname, '../src')
const DIST_PATH = path.resolve(__dirname, '../dist')

const webpackConfig = {
  mode: ENV,

  entry: {
    app:
      ENV === 'development'
        ? [
          path.join(SOURCES_PATH, './app.js'),
          'webpack/hot/dev-server',
          'webpack-hot-middleware/client'
        ]
        : path.join(SOURCES_PATH, './app.js')
  },

  output: {
    filename: 'app.js',
    path: path.join(DIST_PATH, './assets/js'),
    publicPath: '/'
  },

  context: DIST_PATH,

  plugins:
    ENV === 'development' ? [new webpack.HotModuleReplacementPlugin()] : []
}

const scripts = () =>
  new Promise((resolve, reject) =>
    webpack(webpackConfig, (_, stats) => {
      // if (err) {
      //   console.error(`Webpack error: ${err}`)
      // }

      // console.info(stats.toString())

      resolve()
    })
  )

module.exports = { webpackConfig, scripts }
