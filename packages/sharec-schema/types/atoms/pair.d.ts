export = pairAtom
/**
 * @typedef {import('../').Pair<any>} AnyPair
 * @typedef {import('../').SchemaParams<AnyPair>} SchemaAnyPairParams
 * @typedef {import('../').Primitive} Primitive
 * @typedef {import('../').SchemaParams<Primitive>} SchemaPrimitiveParams
 */
/**
 * Merges pairs-like data structures
 * Also can handle string values and other primitives
 * @param {SchemaAnyPairParams|SchemaPrimitiveParams} params
 * @returns {AnyPair|Primitive}
 */
declare function pairAtom(params: SchemaAnyPairParams | SchemaPrimitiveParams): import('..').Pair<any> | Primitive
declare namespace pairAtom {
  export { AnyPair, SchemaAnyPairParams, Primitive, SchemaPrimitiveParams }
}
type SchemaAnyPairParams = {
  current?: import('..').Pair<any>
  upcoming?: import('..').Pair<any>
  cached?: import('..').Pair<any>
  result?: import('..').Pair<any>
}
type SchemaPrimitiveParams = {
  current?: string | number | boolean
  upcoming?: string | number | boolean
  cached?: string | number | boolean
  result?: string | number | boolean
}
type Primitive = string | number | boolean
type AnyPair = [string, any]
