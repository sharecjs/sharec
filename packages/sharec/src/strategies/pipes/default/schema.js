const isMap = require('lodash/isMap')
const { compose, fork } = require('../../actions')
const { hashAtom, listConcatAtom, primitiveAtom } = require('../../atoms')

const defaultJson = compose({
  $$default: fork([[Array.isArray, listConcatAtom], [isMap, hashAtom], primitiveAtom]),
})

module.exports = {
  defaultJson,
}
