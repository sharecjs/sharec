const isMap = require('lodash/isMap')
const { compose, fork } = require('../../actions')
const { ruleAtom, hashAtom, listConcatAtom, primitiveAtom } = require('../../atoms')

const eslintJson = compose({
  env: hashAtom,
  parserOptions: compose({
    ecmaFeatures: fork([[isMap, hashAtom], primitiveAtom]),
    $$default: primitiveAtom,
  }),
  globals: hashAtom,
  extends: fork([[Array.isArray, listConcatAtom], primitiveAtom]),
  plugins: listConcatAtom,
  rules: compose({
    $$default: ruleAtom,
  }),
  overrides: listConcatAtom,
  $$default: primitiveAtom,
})

module.exports = {
  eslintJson,
}
