const { map } = require('../../actions')
const { stylelintJson } = require('./schema')
const { createJsonPipe } = require('../../helpers/pipes')

const stylelintJsonPipe = createJsonPipe(stylelintJson)

const stylelintPipe = map(['.stylelint', stylelintJsonPipe], ['.stylelint.json', stylelintJsonPipe])

module.exports = {
  pipe: stylelintPipe,
}
