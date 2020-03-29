const flow = require('lodash/flow')
const { map } = require('../../actions')
const { packageJson } = require('./schema')
const fromJson = require('../../helpers/pipes/fromJson')

const packageJsonPipe = flow(
  fromJson,
  packageJson,
  input => JSON.stringify(input, null, 2),
)

const packagePipe = map(['package.json', packageJsonPipe])

module.exports = {
  pipe: packagePipe,
}
