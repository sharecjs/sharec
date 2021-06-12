export = listMergeAtom
/**
 * @typedef {import('../').SchemaParams<any[]>} SchemaAnyListParams
 */
/**
 * Merges each value in lists by index with given atom
 * @param {Function} atom
 * @returns {Function}
 */
declare function listMergeAtom(atom: Function): Function
declare namespace listMergeAtom {
  export { SchemaAnyListParams }
}
type SchemaAnyListParams = {
  current?: any[]
  upcoming?: any[]
  cached?: any[]
  result?: any[]
}
