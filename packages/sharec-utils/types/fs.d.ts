/**
 * Makes directory with standard makedir, but do not throws
 * any exceptions
 * @param {String} path Path to new directory
 * @returns {Promise<void>}
 */
export function safeMakeDir(path: string): Promise<void>
/**
 * Find all files by given pattern in all directories located by
 * given path
 * @example
 * await find('.', '*') // will find all files in current dir
 * await find('.', '*.js') // will find all *.js files in current dir
 * @param {String} path Target path
 * @param {String} pattern Matching pattern
 * @returns {Promise<String[]>}
 */
export function find(path: string, pattern: string): Promise<string[]>
