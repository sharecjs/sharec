// @ts-check
const { map } = require('sharec-schema').actions
const { linesConcatAtom } = require('sharec-schema').atoms

const gitignorePipe = map([/^\.?gitignore$/, linesConcatAtom])

module.exports = {
  pipe: gitignorePipe,
  alias: '.gitignore',
}
