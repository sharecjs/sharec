const { fixtures } = require('testUtils')
const { eslintJson } = require('../eslint')

describe.skip('compositions > eslint', () => {
  describe('JSON', () => {
    const eslintBaseFxt = fixtures('eslint/json/01-base', 'json')

    it('should merge configs', () => {
      expect(
        eslintJson({
          current: eslintBaseFxt.current,
          upcoming: eslintBaseFxt.upcoming,
        }),
      ).toEqual(eslintBaseFxt.result)
    })

    it('should unapply configs', () => {
      expect(
        eslintJson({
          current: eslintBaseFxt.result,
          upcoming: eslintBaseFxt.upcoming,
        }),
      ).toEqual(eslintBaseFxt.restored)
    })
  })

  // describe('YAML', () => {
  //   const eslintBaseFxt = fixtures('eslint/yaml/01-base')

  //   it('should merge configs', () => {
  //     expect(
  //       eslintJson.mergeYAML({
  //         current: eslintBaseFxt.current,
  //         upcoming: eslintBaseFxt.upcoming,
  //       }),
  //     ).toWraplessEqual(eslintBaseFxt.result)
  //   })

  //   it('should unapply configs', () => {
  //     expect(
  //       eslintJson.unapplyYAML({
  //         current: eslintBaseFxt.result,
  //         upcoming: eslintBaseFxt.upcoming,
  //       }),
  //     ).toWraplessEqual(eslintBaseFxt.restored)
  //   })
  // })
})
