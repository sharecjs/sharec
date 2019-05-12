const ghPages = require('gh-pages')

console.info('Publishing started! 🚀')

ghPages.publish('./dist', err => {
  if (err) {
    console.error(`Publishing error: ${err}`)
  } else {
    console.info('Site successfully published! ✨')
  }
})
