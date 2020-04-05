const { compose, fork } = require('../../actions')
const { ruleAtom, hashAtom, listConcatAtom, primitiveAtom } = require('../../atoms')

const eslintJson = compose({
  env: hashAtom,
  parserOptions: hashAtom,
  globals: hashAtom,
  extends: fork([[Array.isArray, listConcatAtom], primitiveAtom]),
  plugins: listConcatAtom,
  rules: compose({
    $$default: ruleAtom,
  }),
  $$default: primitiveAtom,
})

module.exports = {
  eslintJson,
}
