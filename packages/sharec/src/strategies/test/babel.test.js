const babelStrategy = require('../babel')

const babel01 = require('./fixtures/babel/babel_01.json')
const babel02 = require('./fixtures/babel/babel_02.json')
const babel03 = require('./fixtures/babel/babel_03.json')

describe('strategy > babel', () => {
  it('should merge babel json configs', () => {
    const res = babelStrategy(babel01, babel02)

    expect(res).toEqual(babel03)
  })
})
