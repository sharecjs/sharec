const { compose } = require('../../actions')
const { primitiveAtom, listConcatAtom } = require('../../atoms')

const yaspellerJson = compose({
  excludeFiles: listConcatAtom,
  ignoreText: listConcatAtom,
  ignoreTags: listConcatAtom,
  dictionary: listConcatAtom,
  fileExtensions: listConcatAtom,
  $$default: primitiveAtom,
})

module.exports = {
  yaspellerJson,
}
