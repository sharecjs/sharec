const { compose, variant } = require('../actions')
const {
  ruleStrategy,
  hashStrategy,
  listStrategy,
  primitiveStrategy,
} = require('../atoms')

const eslintJson = compose({
  env: hashStrategy,
  parserOptions: hashStrategy,
  globals: hashStrategy,
  extends: variant(listStrategy, primitiveStrategy),
  plugins: listStrategy,
  rules: compose({
    $$default: ruleStrategy,
  }),
  $$default: primitiveStrategy,
})

module.exports = {
  eslintJson,
}
