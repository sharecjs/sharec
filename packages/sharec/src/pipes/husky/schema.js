const { compose } = require('sharec-schema/actions')
const { primitiveAtom } = require('sharec-schema/atoms')

const huskyJson = compose({
  hooks: compose({
    $$default: primitiveAtom,
  }),
})

module.exports = {
  huskyJson,
}
