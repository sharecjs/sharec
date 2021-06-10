const { map } = require('sharec-schema').actions
const { stylelintJson } = require('./schema')
const { createJsonPipe } = require('sharec-schema').pipes

const stylelintJsonPipe = createJsonPipe(stylelintJson)

const stylelintPipe = map(['.stylelint', stylelintJsonPipe], ['.stylelint.json', stylelintJsonPipe])

module.exports = {
  pipe: stylelintPipe,
}
