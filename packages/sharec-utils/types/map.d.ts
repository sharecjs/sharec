/**
 * Works like lodash/isMap
 * Returns `true` if given value is instance of Map
 * @param {any} val
 * @returns {boolean}
 */
export function isMap(val: any): boolean
/**
 * Works like lodash/pick, but with maps
 * Picks entries from target map by given keys and returns new map
 * @param {Map} target Target map
 * @param {Array<String>} keys List of keys which should be picked
 * @returns {Map}
 */
export function pick(target: Map<any, any>, keys: Array<string>): Map<any, any>
/**
 * Works like lodash/omit, but with maps
 * Removes entries from target map by given keys and returns new map
 * @param {Map} target Target map
 * @param {Array<String>} keys List of keys which should be removed
 * @returns {Map}
 */
export function omit(target: Map<any, any>, keys: Array<string>): Map<any, any>
/**
 * Works like lodash/pickBy, but with maps
 * Picks entries from target map by given predicate and returns new map
 * @param {Map} target Target map
 * @param {Function} predicate Function checker
 * @returns {Map}
 */
export function pickBy(target: Map<any, any>, predicate: Function): Map<any, any>
/**
 * Works like lodash/omitBy, but with maps
 * Removes entries from target map by given predicate and returns new map
 * @param {Map} target Target map
 * @param {Function} predicate Function checker
 * @returns {Map}
 */
export function omitBy(target: Map<any, any>, predicate: Function): Map<any, any>
