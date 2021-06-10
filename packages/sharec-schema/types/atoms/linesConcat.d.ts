export = linesConcatAtom
/**
 * @typedef {import('../').SchemaParams<string>} SchemaLinesParams
 */
/**
 * Merges lines (string separated by EOLs)
 * Doesn't remove duplicates, just concat lines or remove deleted ones
 * @param {SchemaLinesParams} params
 * @returns {string}
 */
declare function linesConcatAtom(params: SchemaLinesParams): string
declare namespace linesConcatAtom {
  export { SchemaLinesParams }
}
type SchemaLinesParams = {
  current?: string
  upcoming?: string
  cached?: string
  result?: string
}
