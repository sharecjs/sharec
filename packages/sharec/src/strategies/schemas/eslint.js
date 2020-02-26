const { compose, variant } = require('../actions')
const { ruleAtom, hashAtom, listAtom, primitiveAtom } = require('../atoms')

const eslintJson = compose({
  env: hashAtom,
  parserOptions: hashAtom,
  globals: hashAtom,
  extends: variant(listAtom, primitiveAtom),
  plugins: listAtom,
  rules: compose({
    $$default: ruleAtom,
  }),
  $$default: primitiveAtom,
})

module.exports = {
  eslintJson,
}
