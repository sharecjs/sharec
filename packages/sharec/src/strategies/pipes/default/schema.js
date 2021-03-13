const isMap = require('lodash/isMap')
const { compose, fork } = require('sharec-schema/actions')
const { hashAtom, listConcatAtom, primitiveAtom } = require('sharec-schema/atoms')

const defaultJson = compose({
  $$default: fork([[Array.isArray, listConcatAtom], [isMap, hashAtom], primitiveAtom]),
})

module.exports = {
  defaultJson,
}
