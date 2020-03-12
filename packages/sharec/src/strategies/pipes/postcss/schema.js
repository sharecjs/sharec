const { compose } = require('../../actions')
const { hashAtom, primitiveAtom } = require('../../atoms')

const postcssJson = compose({
  plugins: hashAtom,
  $$default: primitiveAtom,
})

module.exports = {
  postcssJson,
}
