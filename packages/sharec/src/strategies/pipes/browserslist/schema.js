const { compose } = require('../../actions')
const { listConcatAtom } = require('../../atoms')

const browserslistJson = compose([listConcatAtom])

module.exports = {
  browserslistJson,
}
