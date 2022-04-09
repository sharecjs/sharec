// @ts-check
const { isMap } = require('sharec-utils').map
const { compose, fork } = require('sharec-schema').actions
const { hashAtom, listConcatAtom, primitiveAtom } = require('sharec-schema').atoms

const defaultJson = compose({
  $$default: fork([[Array.isArray, listConcatAtom], [isMap, hashAtom], primitiveAtom]),
})

module.exports = {
  defaultJson,
}
