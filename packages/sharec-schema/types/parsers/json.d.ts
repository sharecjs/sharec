/**
 * Creates map from JSON string with order saving
 * @param {string} str Raw JSON string
 * @returns {Map}
 */
export function fromJSON(str: string): Map<any, any>
/**
 * Transforms given map to JSON string with order saving
 * @param {Map} map Any map
 * @param {number} [space] Indent spaces count
 * @returns {string}
 */
export function toJSON(map: Map<any, any>, space?: number): string
