const { compose, fork } = require('sharec-schema').actions
const { listMergeAtom, primitiveAtom } = require('sharec-schema').atoms

const lintStagedJson = compose({
  $$default: fork([[Array.isArray, listMergeAtom(primitiveAtom)], primitiveAtom]),
})

module.exports = {
  lintStagedJson,
}
