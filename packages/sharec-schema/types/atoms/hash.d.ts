export = hashAtom
/**
 * @typedef {import('../').SchemaParam<Map<string, any>>} SchemaHashParam
 * @typedef {import('../').SchemaParams<Map<string, any>>} SchemaHashParams
 */
/**
 * Merges objects preseted as maps
 * @param {SchemaHashParams} params
 * @returns {SchemaHashParam}
 */
declare function hashAtom({ current, upcoming, cached }: SchemaHashParams): import('..').SchemaParam<Map<string, any>>
declare namespace hashAtom {
  export { SchemaHashParam, SchemaHashParams }
}
type SchemaHashParams = {
  current?: Map<string, any>
  upcoming?: Map<string, any>
  cached?: Map<string, any>
  result?: Map<string, any>
}
type SchemaHashParam = Map<string, Map<string, any>>
