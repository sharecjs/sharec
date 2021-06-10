export = ruleAtom
/**
 * @typedef {import('../').Rule} Rule
 * @typedef {import('../').SchemaParams<Rule>} SchemaRulesParams
 */
/**
 * Merges rules-like data-strutures (eslint, stylelint etc. rules)
 * Doesn't merge anything, only returns required one, because rule can't be correctly
 * merged
 * Mostly, rule changes mean that rule is not correct anymore
 * @param {SchemaRulesParams} params
 * @returns {Rule}
 */
declare function ruleAtom({ current, upcoming, cached }: SchemaRulesParams): Rule
declare namespace ruleAtom {
  export { Rule, SchemaRulesParams }
}
type SchemaRulesParams = {
  current?: import('..').Rule
  upcoming?: import('..').Rule
  cached?: import('..').Rule
  result?: import('..').Rule
}
type Rule =
  | string
  | number
  | boolean
  | any[]
  | {
      [x: string]: any
    }
