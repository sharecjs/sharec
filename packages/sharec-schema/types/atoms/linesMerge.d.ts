export = linesMergeAtom
/**
 * @typedef {import('../').SchemaParams<string>} SchemaLinesParams
 */
/**
 * Creates list of unique values from lists-params
 * @param {SchemaLinesParams} params
 * @returns {string}
 */
declare function linesMergeAtom(params: SchemaLinesParams): string
declare namespace linesMergeAtom {
  export { SchemaLinesParams }
}
type SchemaLinesParams = {
  current?: string
  upcoming?: string
  cached?: string
  result?: string
}
