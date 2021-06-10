export = listConcatAtom
/**
 * @typedef {import('../').SchemaParams<string[]>} SchemaListParams
 */
/**
 * Creates list of unique values from lists-params
 * @param {SchemaListParams} params
 * @returns {string[]}
 */
declare function listConcatAtom({ current, upcoming }: SchemaListParams): string[]
declare namespace listConcatAtom {
  export { SchemaListParams }
}
type SchemaListParams = {
  current?: string[]
  upcoming?: string[]
  cached?: string[]
  result?: string[]
}
