const { compose } = require('../../actions')
const { listConcatAtom, listMergeAtom, pairAtom } = require('../../atoms')

const babelEnvJson = compose({
  plugins: listMergeAtom(pairAtom),
  presets: listMergeAtom(pairAtom),
})

const babelJson = compose({
  env: compose({
    $$default: babelEnvJson,
  }),
  plugins: listMergeAtom(pairAtom),
  presets: listMergeAtom(pairAtom),
  ignore: listConcatAtom,
})

module.exports = {
  babelJson,
}
