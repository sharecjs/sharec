const { compose } = require('sharec-schema').actions
const { primitiveAtom, listConcatAtom } = require('sharec-schema').atoms

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
