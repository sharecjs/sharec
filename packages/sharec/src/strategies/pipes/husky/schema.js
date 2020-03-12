const { compose } = require('../../actions')
const { primitiveAtom } = require('../../atoms')

const huskyJson = compose({
  hooks: compose({
    $$default: primitiveAtom,
  }),
})

module.exports = {
  huskyJson,
}
