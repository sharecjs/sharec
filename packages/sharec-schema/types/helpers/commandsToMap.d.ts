export = commandsToMap
/**
 * @typedef {import('../').ParsedCommand} ParsedCommand
 * @typedef {import('../').SchemaParams<string>} SchemaStringParams
 * @typedef {import('../').SchemaParams<ParsedCommand>} SchemaCommandsParams
 */
/**
 * Parse given object with raw cli-commands and returns parsed ones
 * for next merge
 * schema params
 * @param {SchemaStringParams} params
 * @returns {SchemaCommandsParams}
 */
declare function commandsToMap(params: SchemaStringParams): SchemaCommandsParams
declare namespace commandsToMap {
  export { ParsedCommand, SchemaStringParams, SchemaCommandsParams }
}
type SchemaStringParams = {
  current?: string
  upcoming?: string
  cached?: string
  result?: string
}
type SchemaCommandsParams = {
  current?: import('..').ParsedCommand
  upcoming?: import('..').ParsedCommand
  cached?: import('..').ParsedCommand
  result?: import('..').ParsedCommand
}
type ParsedCommand = Map<string, any>
