const { fixture } = require('testUtils')
const { babelStrategy } = require('../babel')

describe('strategy > babel', () => {
  describe('json strategy', () => {
    // Base merge case
    const babel01 = fixture('babel/json/babel_01.json', 'json')
    const babel02 = fixture('babel/json/babel_02.json', 'json')

    // Env merging features
    const babel04 = fixture('babel/json/babel_04.json', 'json')
    const babel05 = fixture('babel/json/babel_05.json', 'json')
    const babel07 = fixture('babel/json/babel_07.json', 'json')
    const babel08 = fixture('babel/json/babel_08.json', 'json')

    // Uapply features
    const babel10 = fixture('babel/json/babel_10.json', 'json')
    const babel11 = fixture('babel/json/babel_11.json', 'json')

    describe('merge JSON configs', () => {
      it('should merge babel json configs', () => {
        expect(babelStrategy.mergeJSON(babel01, babel02)).toMatchSnapshot()
      })

      it('should handle unique env cases during merging', () => {
        expect(
          babelStrategy.merge('.babelrc')(babel04, babel05),
        ).toMatchSnapshot()
        expect(
          babelStrategy.merge('.babelrc.json', 'json')(babel05, babel04),
        ).toMatchSnapshot()
        expect(
          babelStrategy.merge('.babelrc')(babel07, babel08),
        ).toMatchSnapshot()
        expect(babelStrategy.merge('babel')(babel08, babel07)).toMatchSnapshot()
      })
    })

    describe('unapply JSON', () => {
      it('should unapply babel JSON config', () => {
        expect(babelStrategy.unapplyJSON(babel10, babel11)).toMatchSnapshot()
      })

      it('should fully unapply babel JSON config', () => {
        expect(babelStrategy.unapplyJSON(babel10, babel10)).toEqual({})
      })

      it('should unapply babel config by file', () => {
        expect(
          babelStrategy.unapply('.babelrc')(babel10, babel11),
        ).toMatchSnapshot()
      })
    })
  })
})
