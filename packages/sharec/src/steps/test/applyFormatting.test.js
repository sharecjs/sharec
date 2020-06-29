const { fixtures, createFakeSpinner } = require('testUtils')
const applyFormatting = require('../applyFormatting')

describe('steps > applyFormatting', () => {
  const jsonFxt = fixtures('default/json/02-formatting')
  const yamlFxt = fixtures('default/yaml/01-formatting')

  it('should apply format from input to current configs', () => {
    const spinner = createFakeSpinner()
    const input = {
      mergedConfigs: {
        '/foo.json': jsonFxt.current,
        '/bar.yaml': yamlFxt.current,
      },
      format: {
        '*': {
          indentSize: 2,
          indentType: 'space',
          eof: false,
        },
      },
    }

    const output = applyFormatting(spinner)(input)

    expect(output.mergedConfigs['/foo.json']).toWraplessEqual(jsonFxt.result, {
      eof: false
    })
    expect(output.mergedConfigs['/bar.yaml']).toWraplessEqual(yamlFxt.result, {
      eof: false
    })
  })

  it('should apply format from input to current configs by patterns', () => {
    const spinner = createFakeSpinner()
    const input = {
      mergedConfigs: {
        '/foo.json': jsonFxt.current,
        '/bar.yaml': yamlFxt.current,
      },
      format: {
        '*.json': {
          indentSize: 2,
          indentType: 'space',
          eof: false,
        },
      },
    }

    const output = applyFormatting(spinner)(input)

    expect(output.mergedConfigs['/foo.json']).toWraplessEqual(jsonFxt.result, {
      eof: false
    })
    expect(output.mergedConfigs['/bar.yaml']).toWraplessEqual(yamlFxt.current, {
      eof: false
    })
  })

  it('should not change files if format is not passing to input', () => {
    const spinner = createFakeSpinner()
    const input = {
      mergedConfigs: {
        '/foo.json': jsonFxt.current,
        '/bar.yaml': yamlFxt.current,
      },
    }

    const output = applyFormatting(spinner)(input)

    expect(output).toEqual({
      ...input,
      mergedConfigs: {
        '/foo.json': jsonFxt.current,
        '/bar.yaml': yamlFxt.current,
      },
    })
  })
})