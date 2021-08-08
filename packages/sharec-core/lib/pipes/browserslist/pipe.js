// @ts-check
const { map } = require('sharec-schema').actions
const { linesConcatAtom } = require('sharec-schema').atoms

const browserslistPipe = map(['.browserslistrc', linesConcatAtom])

module.exports = {
  pipe: browserslistPipe,
}
