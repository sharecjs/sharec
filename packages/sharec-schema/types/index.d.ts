export type ParsedCommand = Map<string, any>
export type SchemaParam<T> = Map<string, T>
export type SchemaParams<T> = {
  current?: T
  upcoming?: T
  cached?: T
  result?: T
}
export type Schema = {
  [x: string]: any
}
export type Primitive = string | number | boolean
export type Pair<T> = [string, T]
export type Rule =
  | string
  | number
  | boolean
  | any[]
  | {
      [x: string]: any
    }
import actions = require('./actions')
import atoms = require('./atoms')
import helpers = require('./helpers')
import parsers = require('./parsers')
import pipes = require('./pipes')
export { actions, atoms, helpers, parsers, pipes }
