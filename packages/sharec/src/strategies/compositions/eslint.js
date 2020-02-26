const { compose } = require('../actions')
const {
  ruleStrategy,
  hashStrategy,
  listStrategy,
  primitiveStrategy,
} = require('../atoms')

const eslintJson = compose({
  env: hashStrategy,
  parserOptions: hashStrategy,
  extends: listStrategy,
  plugins: listStrategy,
  rules: compose({
    $$default: ruleStrategy,
  }),
  $$default: primitiveStrategy,
})

module.exports = {
  eslintJson,
}
