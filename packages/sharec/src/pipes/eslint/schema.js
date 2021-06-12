// @ts-check
const isMap = require('lodash/isMap')
const { compose, fork } = require('sharec-schema').actions
const { ruleAtom, hashAtom, listConcatAtom, primitiveAtom } = require('sharec-schema').atoms

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
