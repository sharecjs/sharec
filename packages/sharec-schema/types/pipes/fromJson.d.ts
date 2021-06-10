export = fromJsonPipe
/**
 * @typedef {import('../').SchemaParams<string>} SchemaJsonParams
 * @typedef {import('../').SchemaParams<Map<string, any>>} SchemaHashParams
 */
/**
 * Transforms JSON params to Hash params
 * @param {SchemaJsonParams} params
 * @returns {SchemaHashParams}
 */
declare function fromJsonPipe(params: SchemaJsonParams): SchemaHashParams
declare namespace fromJsonPipe {
  export { SchemaJsonParams, SchemaHashParams }
}
type SchemaJsonParams = {
  current?: string
  upcoming?: string
  cached?: string
  result?: string
}
type SchemaHashParams = {
  current?: Map<string, any>
  upcoming?: Map<string, any>
  cached?: Map<string, any>
  result?: Map<string, any>
}
