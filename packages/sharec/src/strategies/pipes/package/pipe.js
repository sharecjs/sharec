const { map } = require('../../actions')
const { packageJson } = require('./schema')
const { createJsonPipe } = require('../../helpers/pipes')

const packageJsonPipe = createJsonPipe(packageJson)

const packagePipe = map(['package.json', packageJsonPipe])

module.exports = {
  pipe: packagePipe,
}
