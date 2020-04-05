const { map } = require('../../actions')
const { babelJson } = require('./schema')
const { createJsonPipe } = require('../../helpers/pipes')

const babelJsonPipe = createJsonPipe(babelJson)

const babelPipe = map(['.babelrc', babelJsonPipe], ['.babelrc.json', babelJsonPipe], ['babelrc.json', babelJsonPipe])

module.exports = {
  pipe: babelPipe,
}
