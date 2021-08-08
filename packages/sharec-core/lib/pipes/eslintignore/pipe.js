// @ts-check
const { map } = require('sharec-schema').actions
const { linesConcatAtom } = require('sharec-schema').atoms

const eslintignorePipe = map(['.eslintignore', linesConcatAtom])

module.exports = {
  pipe: eslintignorePipe,
}
