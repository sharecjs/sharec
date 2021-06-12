export type FormattingRules = {
  indentType?: 'space' | 'tab'
  indentSize?: number
  eof?: boolean
}
export type MappedFormattingRules = {
  [x: string]: FormattingRules
}
import format = require('./format')
import fs = require('./fs')
import map = require('./map')
import std = require('./std')
import path = require('./path')
export { format, fs, map, std, path }
