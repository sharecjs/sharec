export = createYamlPipe
/**
 * @typedef {import('../').SchemaParams<string>} SchemaYamlParams
 */
/**
 * Creates function with given handlers which accepts params in YAML format
 * and returns data in the same format
 * @param {...Function[]} handlers
 * @returns {Function}
 */
declare function createYamlPipe(...handlers: Function[][]): Function
declare namespace createYamlPipe {
  export { SchemaYamlParams }
}
type SchemaYamlParams = {
  current?: string
  upcoming?: string
  cached?: string
  result?: string
}
