const { fixtures, createFakeSpinner, createFakePrompt } = require('testUtils')
const applyFormatting = require('../applyFormatting')

describe('steps > applyFormatting', () => {
  let spinner
  let prompt
  const jsonFxt = fixtures('default/json/02-formatting')
  const yamlFxt = fixtures('default/yaml/01-formatting')

  beforeEach(() => {
    spinner = createFakeSpinner()
    prompt = createFakePrompt()
  })

  context('without config', () => {
    it('applies format to configs', () => {
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

      const output = applyFormatting({ spinner, prompt })(input)

      expect(output.mergedConfigs['/foo.json']).toWraplessEqual(jsonFxt.result, {
        eof: false,
      })
      expect(output.mergedConfigs['/bar.yaml']).toWraplessEqual(yamlFxt.result, {
        eof: false,
      })
    })

    it('applies format to configs by patterns', () => {
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

      const output = applyFormatting({ spinner, prompt })(input)

      expect(output.mergedConfigs['/foo.json']).toWraplessEqual(jsonFxt.result, {
        eof: false,
      })
      expect(output.mergedConfigs['/bar.yaml']).toWraplessEqual(yamlFxt.current, {
        eof: false,
      })
    })

    it('does not apply tabs to yaml files', () => {
      const input = {
        mergedConfigs: {
          '/bar.yaml': yamlFxt.current,
        },
        format: {
          '*.yaml': {
            indentSize: 4,
            indentType: 'tab',
            eof: false,
          },
        },
      }

      const output = applyFormatting({ spinner, prompt })(input)

      expect(output.mergedConfigs['/bar.yaml']).toWraplessEqual(yamlFxt.current, {
        eof: false,
      })
    })

    it('does not change files without format', () => {
      const input = {
        mergedConfigs: {
          '/foo.json': jsonFxt.current,
          '/bar.yaml': yamlFxt.current,
        },
      }
      const output = applyFormatting({ spinner, prompt })(input)

      expect(output).toEqual({
        ...input,
        mergedConfigs: {
          '/foo.json': jsonFxt.current,
          '/bar.yaml': yamlFxt.current,
        },
      })
    })
  })

  context('with config', () => {
    it('does not apply format if config is ignored', () => {
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
        sharecConfig: {
          configs: {
            '/foo.json': {
              format: false,
            },
          },
        },
      }

      const output = applyFormatting({ spinner, prompt })(input)

      expect(output.mergedConfigs['/foo.json']).toWraplessEqual(jsonFxt.current, {
        eof: false,
      })
      expect(output.mergedConfigs['/bar.yaml']).toWraplessEqual(yamlFxt.result, {
        eof: false,
      })
    })
  })
})
