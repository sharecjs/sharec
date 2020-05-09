const json8 = require('json8')

const fromJSON = (str) => json8.parse(str, { map: true })

const toJSON = (map, space = 2) => json8.serialize(map, { space })

module.exports = {
  fromJSON,
  toJSON,
}
