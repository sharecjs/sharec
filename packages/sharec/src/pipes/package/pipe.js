const { map } = require('sharec-schema/actions')
const { packageJson } = require('./schema')
const { createJsonPipe } = require('sharec-schema/helpers/pipes')

const packageJsonPipe = createJsonPipe(packageJson)

const packagePipe = map(['package.json', packageJsonPipe])

module.exports = {
  pipe: packagePipe,
}
