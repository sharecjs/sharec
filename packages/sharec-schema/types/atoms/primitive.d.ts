export = primitiveAtom
/**
 * @typedef {import('../').Primitive} Primitive
 * @typedef {import('../').SchemaParams<Primitive>} SchemaPrimitiveParams
 */
/**
 * Merges primitive data types
 * @param {SchemaPrimitiveParams} params
 * @returns {Primitive}
 */
declare function primitiveAtom({ current, upcoming, cached }: SchemaPrimitiveParams): Primitive
declare namespace primitiveAtom {
  export { Primitive, SchemaPrimitiveParams }
}
type SchemaPrimitiveParams = {
  current?: string | number | boolean
  upcoming?: string | number | boolean
  cached?: string | number | boolean
  result?: string | number | boolean
}
type Primitive = string | number | boolean
