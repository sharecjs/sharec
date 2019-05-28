const path = require('path')
const { readFileSync } = require.requireActual('fs')
const { strategy, yamlStrategy } = require('strategies/babel')

describe('strategy > babel', () => {
  describe('json strategy', () => {
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

    it('should merge babel json configs', () => {
      expect(strategy(babel01, babel02)).toEqual(babel03)
    })

    it('should handle unique env cases during merging', () => {
      expect(strategy(babel04, babel05)).toEqual(babel06)
      expect(strategy(babel05, babel04)).toEqual(babel06)
      expect(strategy(babel07, babel08)).toEqual(babel09)
      expect(strategy(babel08, babel07)).toEqual(babel09)
    })
  })

  describe('yaml strategy', () => {
    // Base merge case
    const babel01 = readFileSync(
      path.resolve(__dirname, './fixtures/babel/yaml/babel_01.yml'),
      'utf8',
    )
    const babel02 = readFileSync(
      path.resolve(__dirname, './fixtures/babel/yaml/babel_02.yml'),
      'utf8',
    )
    const babel03 = readFileSync(
      path.resolve(__dirname, './fixtures/babel/yaml/babel_03.yml'),
      'utf8',
    )

    // Env merging features
    const babel04 = readFileSync(
      path.resolve(__dirname, './fixtures/babel/yaml/babel_04.yml'),
      'utf8',
    )
    const babel05 = readFileSync(
      path.resolve(__dirname, './fixtures/babel/yaml/babel_05.yml'),
      'utf8',
    )
    const babel06 = readFileSync(
      path.resolve(__dirname, './fixtures/babel/yaml/babel_06.yml'),
      'utf8',
    )
    const babel07 = readFileSync(
      path.resolve(__dirname, './fixtures/babel/yaml/babel_07.yml'),
      'utf8',
    )
    const babel08 = readFileSync(
      path.resolve(__dirname, './fixtures/babel/yaml/babel_08.yml'),
      'utf8',
    )
    const babel09 = readFileSync(
      path.resolve(__dirname, './fixtures/babel/yaml/babel_09.yml'),
      'utf8',
    )

    it('should merge babel yaml configs', () => {
      expect(yamlStrategy(babel01, babel02)).toEqual(babel03)
    })

    it('should handle unique env cases during merging', () => {
      expect(yamlStrategy(babel04, babel05)).toEqual(babel06)
      expect(yamlStrategy(babel05, babel04)).toEqual(babel06)
      expect(yamlStrategy(babel07, babel08)).toEqual(babel09)
      expect(yamlStrategy(babel08, babel07)).toEqual(babel09)
    })
  })
})
