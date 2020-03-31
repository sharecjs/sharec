const { compose } = require('../../actions')
const { ruleAtom, primitiveAtom } = require('../../atoms')

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
