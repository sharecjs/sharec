const { compose } = require('../../actions')
const { listMergeAtom, primitiveAtom } = require('../../atoms')

const lintStagedJson = compose({
  $$default: listMergeAtom(primitiveAtom),
})

module.exports = {
  lintStagedJson,
}
