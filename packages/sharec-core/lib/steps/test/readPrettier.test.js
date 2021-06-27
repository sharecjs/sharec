const { vol } = require('memfs')
const { fixtures, createFakeSpinner, createFakePrompt } = require('testUtils')
const readPrettier = require('../readPrettier')

describe('steps > readPrettier', () => {
  let spinner
  let prompt
  const prettierFxt = fixtures('prettier/json/00-base')

  beforeEach(() => {
    spinner = createFakeSpinner()
    prompt = createFakePrompt()
    vol.reset()
  })

  describe('with .prettierrc', () => {
    const input = {
      targetPath: '/target',
      configPath: '/configuration-package',
    }

    it('should read .prettierrc from upcoming config', async () => {
      const dir = {
        '/configuration-package/configs/.prettierrc': prettierFxt.current,
      }

      vol.fromJSON(dir, input.targetPath)

      const output = await readPrettier({ spinner, prompt })(input)

      expect(output).toEqual({
        ...input,
        format: {
          '*': {
            indentSize: 2,
            indentType: 'space',
            eof: true,
          },
        },
      })
    })

    it('should read .prettierrc from target package if it is not present in upcoming config', async () => {
      const dir = {
        '/target/.prettierrc': prettierFxt.current,
      }

      vol.fromJSON(dir, input.targetPath)

      const output = await readPrettier({ spinner, prompt })(input)

      expect(output).toEqual({
        ...input,
        format: {
          '*': {
            indentSize: 2,
            indentType: 'space',
            eof: true,
          },
        },
      })
    })
  })

  describe('without .prettierrc', () => {
    it("should read prettier configuration from upcoming config's package.json", async () => {
      const dir = {}
      const input = {
        targetPath: '/target',
        configPath: '/configuration-package',
        configs: {
          'package.json': JSON.stringify({
            prettier: {
              ...JSON.parse(prettierFxt.current),
            },
          }),
        },
      }

      vol.fromJSON(dir, input.targetPath)

      const output = await readPrettier({ spinner, prompt })(input)

      expect(output).toEqual({
        ...input,
        format: {
          '*': {
            indentSize: 2,
            indentType: 'space',
            eof: true,
          },
        },
      })
    })

    it('should read prettier configuration from target package package.json if it is not present in upcoming config', async () => {
      const dir = {}
      const input = {
        targetPath: '/target',
        configPath: '/configuration-package',
        configs: {
          'package.json': JSON.stringify({
            prettier: {
              ...JSON.parse(prettierFxt.current),
            },
          }),
        },
      }

      vol.fromJSON(dir, input.targetPath)

      const output = await readPrettier({ spinner, prompt })(input)

      expect(output).toEqual({
        ...input,
        format: {
          '*': {
            indentSize: 2,
            indentType: 'space',
            eof: true,
          },
        },
      })
    })
  })

  it('should leave format field empty if prettier configuration is not present', async () => {
    const dir = {}
    const input = {
      targetPath: '/target',
      configPath: '/configuration-package',
    }

    vol.fromJSON(dir, input.targetPath)

    const output = await readPrettier({ spinner, prompt })(input)

    expect(output).toEqual(input)
  })
})
