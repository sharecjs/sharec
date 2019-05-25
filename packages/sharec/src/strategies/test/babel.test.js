const babelStrategy = require('../babel')

// Base merge case
const babel01 = require('./fixtures/babel/json/babel_01.json')
const babel02 = require('./fixtures/babel/json/babel_02.json')
const babel03 = require('./fixtures/babel/json/babel_03.json')

// Env merging features
const babel04 = require('./fixtures/babel/json/babel_04.json')
const babel05 = require('./fixtures/babel/json/babel_05.json')
const babel06 = require('./fixtures/babel/json/babel_06.json')
const babel07 = require('./fixtures/babel/json/babel_07.json')
const babel08 = require('./fixtures/babel/json/babel_08.json')
const babel09 = require('./fixtures/babel/json/babel_09.json')

describe('strategy > babel', () => {
  it('should merge babel json configs', () => {
    const res = babelStrategy(babel01, babel02)

    expect(res).toEqual(babel03)
  })

  it('should handle unique env cases during merging', () => {
    expect(babelStrategy(babel04, babel05)).toEqual(babel06)
    expect(babelStrategy(babel05, babel04)).toEqual(babel06)
    expect(babelStrategy(babel07, babel08)).toEqual(babel09)
    expect(babelStrategy(babel08, babel07)).toEqual(babel09)
  })
})
