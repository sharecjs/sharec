const isObject = require('lodash/isObject')
const { compose, fork } = require('../../actions')
const { hashAtom, listConcatAtom, primitiveAtom } = require('../../atoms')

const defaultJson = compose({
  $$default: fork([[Array.isArray, listConcatAtom], [isObject, hashAtom], primitiveAtom]),
})

module.exports = {
  defaultJson,
}
