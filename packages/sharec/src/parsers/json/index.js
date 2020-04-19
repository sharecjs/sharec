const json8 = require('json8')

const parseJSON = str => json8.parse(str, { map: true })

const makeJSON = map =>
  json8.serialize(map, {
    space: 2,
  })

module.exports = {
  parseJSON,
  makeJSON,
}
