export type FormattingRules = {
  indentType?: 'tab' | 'space'
  indentSize?: number
  eof?: boolean
}
export type MappedFormattingRules = {
  [x: string]: import('.').FormattingRules
}
/**
 * Returns true if given string containse space indent
 * @param {string} str
 * @returns {boolean}
 */
export function hasSpacesIndent(str: string): boolean
/**
 * @typedef {import('./index').FormattingRules} FormattingRules
 * @typedef {import('./index').MappedFormattingRules} MappedFormattingRules
 */
/**
 * Returns true if given string contains tab indent
 * @param {string} str
 * @returns {boolean}
 */
export function hasTabsIndent(str: string): boolean
/**
 * Returns true if given string contains empty line at the end
 * @param {string} str
 * @returns {boolean}
 */
export function hasEOF(str: string): boolean
/**
 * Cuts off EOL in the end of the file
 * @param {string} str
 * @returns {string}
 */
export function cutEOF(str: string): string
/**
 * Replaces all indents in string by spaces with given size
 * @param {string} [str = '']
 * @param {number} [size = 2]
 * @returns {string}
 */
export function indentWithSpace(str?: string, size?: number): string
/**
 * Replaces all indents in string by tabs
 * @param {string} [str = '']
 * @returns {string}
 */
export function indentWithTab(str?: string): string
/**
 * Formats string (probably file's content) with given formatting options
 * @param {Object} params
 * @param {string} params.filename
 * @param {string} params.content
 * @param {FormattingRules} [params.rules]
 * @returns {string}
 */
export function applyFormat({
  filename,
  content,
  rules,
}: {
  filename: string
  content: string
  rules: FormattingRules
}): string
/**
 * @param {MappedFormattingRules} formats
 * @param {string} filename
 * @returns {FormattingRules|null}
 */
export function getFormatByFilename(formats: MappedFormattingRules, filename: string): FormattingRules | null
