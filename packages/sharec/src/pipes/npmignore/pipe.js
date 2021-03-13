const { map } = require('sharec-schema/actions')
const { linesConcatAtom } = require('sharec-schema/atoms')

const npmignorePipe = map([/^\.?npmignore$/, linesConcatAtom])

module.exports = {
  pipe: npmignorePipe,
  alias: '.npmignore',
}
