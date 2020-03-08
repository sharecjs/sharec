const { compose, fork } = require('../actions')
const {
  ruleAtom,
  listConcatAtom,
  listMergeAtom,
  primitiveAtom,
  pairAtom,
} = require('../atoms')

const stylelintJson = compose({
  extends: fork([[Array.isArray, listConcatAtom], primitiveAtom]),
  plugins: listConcatAtom,
  rules: compose({
    $$default: ruleAtom,
  }),
  ignoreFiles: listConcatAtom,
  defaultSeverity: primitiveAtom,
  processors: listMergeAtom(pairAtom),
})

module.exports = {
  stylelintJson,
}
