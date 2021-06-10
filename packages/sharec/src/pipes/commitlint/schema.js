const { compose } = require('sharec-schema').actions
const { ruleAtom, primitiveAtom } = require('sharec-schema').atoms

const commitlintJson = compose({
  parserPreset: primitiveAtom,
  rules: compose({
    $$default: ruleAtom,
  }),
  $$default: primitiveAtom,
})

module.exports = {
  commitlintJson,
}
