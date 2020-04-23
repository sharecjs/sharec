const { safeLoad, safeDump } = require('js-yaml')

const fromYAML = str => JSON.stringify(safeLoad(str), null, 2)

const toYAML = str => safeDump(JSON.parse(str))

module.exports = {
  fromYAML,
  toYAML,
}
