const { compose } = require('sharec-schema').actions
const { listConcatAtom, listMergeAtom, pairAtom } = require('sharec-schema').atoms

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
