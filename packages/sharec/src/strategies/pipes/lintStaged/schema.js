const { compose, fork } = require('../../actions')
const { listMergeAtom, primitiveAtom } = require('../../atoms')

const lintStagedJson = compose({
  $$default: fork([[Array.isArray, listMergeAtom(primitiveAtom)], primitiveAtom]),
})

module.exports = {
  lintStagedJson,
}
