const { compose } = require('../../actions')
const { primitiveAtom } = require('../../atoms')

const prettierJson = compose({
  $$default: primitiveAtom,
})

module.exports = {
  prettierJson,
}
