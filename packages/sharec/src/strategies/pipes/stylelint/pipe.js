const flow = require('lodash/flow')
const { map } = require('../../actions')
const { stylelintJson } = require('./schema')
const fromJson = require('../../helpers/pipes/fromJson')

const stylelintJsonPipe = flow(
  fromJson,
  stylelintJson,
  input => JSON.stringify(input, null, 2),
)

const stylelintPipe = map(
  ['.stylelint', stylelintJsonPipe],
  ['.stylelint.json', stylelintJsonPipe],
)

module.exports = stylelintPipe
