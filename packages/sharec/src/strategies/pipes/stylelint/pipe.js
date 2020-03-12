const { map } = require('../../actions')
const { stylelintJson } = require('./schema')

const stylelintPipe = map(
  ['.stylelint', stylelintJson],
  ['.stylelint.json', stylelintJson],
)

module.exports = stylelintPipe
