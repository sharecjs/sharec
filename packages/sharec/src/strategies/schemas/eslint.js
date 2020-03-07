const { compose, fork } = require('../actions')
const { ruleAtom, hashAtom, listAtom, primitiveAtom } = require('../atoms')

const eslintJson = compose({
  env: hashAtom,
  parserOptions: hashAtom,
  globals: hashAtom,
  extends: fork([[Array.isArray, listAtom], primitiveAtom]),
  plugins: listAtom,
  rules: compose({
    $$default: ruleAtom,
  }),
  $$default: primitiveAtom,
})

module.exports = {
  eslintJson,
}
