const { babelStrategy } = require('strategies/babel')

describe('strategy > babel', () => {
  describe('json strategy', () => {
    // Base merge case
    const babel01 = require('fixtures/babel/json/babel_01.json')
    const babel02 = require('fixtures/babel/json/babel_02.json')

    // Env merging features
    const babel04 = require('fixtures/babel/json/babel_04.json')
    const babel05 = require('fixtures/babel/json/babel_05.json')
    const babel07 = require('fixtures/babel/json/babel_07.json')
    const babel08 = require('fixtures/babel/json/babel_08.json')

    // Uapply features
    const babel10 = require('fixtures/babel/json/babel_10.json')
    const babel11 = require('fixtures/babel/json/babel_11.json')

    it('should merge babel json configs', () => {
      expect(babelStrategy.mergeJSON(babel01, babel02)).toMatchSnapshot()
    })

    it('should handle unique env cases during merging', () => {
      expect(
        babelStrategy.merge('.babelrc')(babel04, babel05),
      ).toMatchSnapshot()
      expect(
        babelStrategy.merge('.babelrc.json')(babel05, babel04),
      ).toMatchSnapshot()
      expect(
        babelStrategy.merge('.babelrc')(babel07, babel08),
      ).toMatchSnapshot()
      expect(babelStrategy.merge('babel')(babel08, babel07)).toMatchSnapshot()
    })

    it('should unapply babel JSON config', () => {
      expect(babelStrategy.unapplyJSON(babel10, babel11)).toMatchSnapshot()
    })

    it('should unapply babel config by file', () => {
      expect(
        babelStrategy.unapply('.babelrc')(babel11, babel10),
      ).toMatchSnapshot()
    })
  })
})
