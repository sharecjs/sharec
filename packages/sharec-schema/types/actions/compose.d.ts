export = compose
/**
 * Main utility which allows to create callable schemas-representation
 * Returns function which applies incoming params by given schema
 * @param {Schema} schema
 * @returns {Function}
 */
declare function compose(schema: Schema): Function
declare namespace compose {
  export { Schema, SchemaParams }
}
type Schema = {
  [x: string]: any
}
type SchemaParams = {
  current?: any
  upcoming?: any
  cached?: any
  result?: any
}
