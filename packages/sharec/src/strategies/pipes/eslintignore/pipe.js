const { map } = require('../../actions')
const { linesConcatAtom } = require('../../atoms')

const eslintignorePipe = map(['.eslintignore', linesConcatAtom])

module.exports = {
  pipe: eslintignorePipe,
}
