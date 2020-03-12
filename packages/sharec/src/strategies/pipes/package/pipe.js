const { map } = require('../../actions')
const { packageJson } = require('./schema')

const packagePipe = map(['package.json', packageJson])

module.exports = packagePipe
