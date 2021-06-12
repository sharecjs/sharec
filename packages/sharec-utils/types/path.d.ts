/**
 * Original node `path.join`, but with normalized slashes
 * @param {String} p
 * @param {...String} parts
 * @returns {String}
 */
export function join(p: string, ...parts: string[]): string
/**
 * Original node `path.resolve`, but with normalized slashes
 * @param {String} p
 * @param {...String} parts
 * @returns {String}
 */
export function resolve(p: string, ...parts: string[]): string
/**
 * Original node `path.basename`, but with normalized slashes
 * @param {String} p
 * @param {String=} ext
 * @returns {String}
 */
export function basename(p: string, ext?: string | undefined): string
/**
 * Original node `path.dirname`, but with normalized slashes
 * @param {String} p
 * @returns {String}
 */
export function dirname(p: string): string
