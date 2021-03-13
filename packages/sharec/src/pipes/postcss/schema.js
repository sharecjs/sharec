const { compose } = require('sharec-schema/actions')
const { hashAtom, primitiveAtom } = require('sharec-schema/atoms')

const postcssJson = compose({
  plugins: hashAtom,
  $$default: primitiveAtom,
})

module.exports = {
  postcssJson,
}
