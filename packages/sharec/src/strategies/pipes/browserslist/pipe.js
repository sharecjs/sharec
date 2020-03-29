const { map } = require('../../actions')
const { linesConcatAtom } = require('../../atoms')

const browserslistPipe = map(['.browserslistrc', linesConcatAtom])

module.exports = {
  pipe: browserslistPipe,
}
