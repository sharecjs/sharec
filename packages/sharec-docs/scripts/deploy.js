const path = require('path')
const ghPages = require('gh-pages')

console.info('Deploying...')

ghPages.publish(path.resolve(__dirname, '../dist'), err => {
  if (err) {
    console.error('Deploy failed!')
    console.error(err)
    process.exit(1)
  }

  console.info('Deployed!')
})
