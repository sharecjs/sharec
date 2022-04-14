const Markdown = require('markdown-it')
const { loadFront } = require('yaml-front-matter')

const md = new Markdown()

module.exports = (config) => {
  config.addDataExtension('md', contents => {
    const { __content, ...frontMatter } = loadFront(contents)

    return {
      ...frontMatter,
      body: md.render(__content),
    }
  })
}
