const path = require('path')
const browserSync = require('browser-sync').create()

function serve(cb) {
  browserSync.init({
    server: {
      baseDir: path.resolve(__dirname, '../dist/'),
    },
    port: 3000,
    open: false,
  })
  cb()
}

function reload(cb) {
  browserSync.reload()
  cb()
}

module.exports = {
  serve,
  reload,
}
