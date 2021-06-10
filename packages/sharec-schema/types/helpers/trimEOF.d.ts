export = trimEOF
/** @typedef {import('../').SchemaParams<string>} SchemaParams */
/**
 * Trims EOL from all given strings mapped by any keys
 * @param {SchemaParams} params
 * @returns {SchemaParams}
 */
declare function trimEOF(params: SchemaParams): SchemaParams
declare namespace trimEOF {
  export { SchemaParams }
}
type SchemaParams = {
  current?: string
  upcoming?: string
  cached?: string
  result?: string
}
