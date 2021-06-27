const { vol } = require('memfs')
const { fixtures, createFakeSpinner, createFakePrompt } = require('testUtils')
const readEditorconfig = require('../readEditorconfig')

describe('steps > readEditorconfig', () => {
  let spinner
  let prompt
  const editorconfigFxt = fixtures('editorconfig/lines/00-base')
  const input = {
    targetPath: '/target',
    configPath: '/configuration-package',
  }

  beforeEach(() => {
    spinner = createFakeSpinner()
    prompt = createFakePrompt()
    vol.reset()
  })

  it('should read editorconfig from upcoming config', async () => {
    const dir = {
      '/configuration-package/configs/.editorconfig': editorconfigFxt.current,
    }

    vol.fromJSON(dir, input.targetPath)

    const output = await readEditorconfig({ spinner, prompt })(input)

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

  it('should read editorconfig from target package if it is not present in upcoming config', async () => {
    const dir = {
      '/target/.editorconfig': editorconfigFxt.current,
    }

    vol.fromJSON(dir, input.targetPath)

    const output = await readEditorconfig({ spinner, prompt })(input)

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
