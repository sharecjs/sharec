export = linesToLists
/**
 * @typedef {import('../').SchemaParams<string>} SchemaStringParams
 * @typedef {import('../').SchemaParams<string[]>} SchemaListParams
 */
/**
 * Splits given lines to mapped strings lists
 * @param {SchemaStringParams} params
 * @returns {SchemaListParams}
 */
declare function linesToLists(params: SchemaStringParams): SchemaListParams
declare namespace linesToLists {
  export { SchemaStringParams, SchemaListParams }
}
type SchemaStringParams = {
  current?: string
  upcoming?: string
  cached?: string
  result?: string
}
type SchemaListParams = {
  current?: string[]
  upcoming?: string[]
  cached?: string[]
  result?: string[]
}
