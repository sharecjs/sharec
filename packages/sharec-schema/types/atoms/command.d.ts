export = commandAtom
/**
 * Merges parsed cli-commands and returns cli-command string
 * @param {SchemaRawCommandParams} params
 * @returns {string}
 */
declare function commandAtom(params: SchemaRawCommandParams): string
declare namespace commandAtom {
  export { ParsedCommand, SchemaCommandParam, SchemaRawCommandParams }
}
type SchemaRawCommandParams = {
  current?: string
  upcoming?: string
  cached?: string
  result?: string
}
type ParsedCommand = Map<string, any>
type SchemaCommandParam = Map<string, import('..').ParsedCommand>
