const { compose } = require('../actions')
const { hashStrategy, primitiveStrategy } = require('../atoms')

const postcssJson = compose({
  plugins: hashStrategy,
  $$default: primitiveStrategy,
})

module.exports = {
  postcssJson,
}
