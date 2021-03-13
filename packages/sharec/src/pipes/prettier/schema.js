const { compose } = require('sharec-schema/actions')
const { primitiveAtom } = require('sharec-schema/atoms')

const prettierJson = compose({
  $$default: primitiveAtom,
})

module.exports = {
  prettierJson,
}
