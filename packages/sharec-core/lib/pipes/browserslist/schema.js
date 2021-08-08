// @ts-check
const { compose } = require('sharec-schema').actions
const { listConcatAtom } = require('sharec-schema').atoms

const browserslistJson = compose([listConcatAtom])

module.exports = {
  browserslistJson,
}
