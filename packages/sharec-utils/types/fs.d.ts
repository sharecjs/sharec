/**
 * Makes directory with standard makedir, but do not throws
 * any exceptions
 * @param {string} path Path to new directory
 * @returns {Promise<void>}
 */
export function safeMakeDir(path: string): Promise<void>
/**
 * Find all files by given pattern in all directories located by
 * given path
 * @example
 * await find('.', '*') // will find all files in current dir
 * await find('.', '*.js') // will find all *.js files in current dir
 * @param {string} path Target path
 * @param {string} pattern Matching pattern
 * @returns {Promise<string[]>}
 */
export function find(path: string, pattern: string): Promise<string[]>
