const { map } = require('../../actions')
const { linesConcatAtom } = require('../../atoms')

const npmignorePipe = map([/^\.?npmignore$/, linesConcatAtom])

module.exports = {
  pipe: npmignorePipe,
  alias: '.npmignore',
}
