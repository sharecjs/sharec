export = fromYaml
/**
 * @typedef {import('../').SchemaParams<string>} SchemaYamlParams
 * @typedef {import('../').SchemaParams<Map<string, any>>} SchemaHashParams
 */
/**
 * Transforms JSON params to Hash params
 * @param {SchemaYamlParams} params
 * @returns {SchemaHashParams}
 */
declare function fromYaml(params: SchemaYamlParams): SchemaHashParams
declare namespace fromYaml {
  export { SchemaYamlParams, SchemaHashParams }
}
type SchemaYamlParams = {
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
