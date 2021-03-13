// @ts-check

/**
 * @typedef {import('types/Schema').Primitive} Primitive
 * @typedef {import('types/Schema').SchemaPrimitiveParams} SchemaPrimitiveParams
 */

/**
 * Merges primitive data types
 * @param {SchemaPrimitiveParams} params
 * @returns {Primitive}
 */
function primitiveAtom({ current, upcoming, cached }) {
  if (current && upcoming === undefined) return current
  if (current === undefined && upcoming) return upcoming

  const withCache = cached !== undefined

  if (withCache && current !== cached) return current
  if (current !== upcoming) return upcoming

  return current
}

module.exports = primitiveAtom
