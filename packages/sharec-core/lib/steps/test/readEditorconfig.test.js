const { vol } = require('memfs')
const { fixtures } = require('testUtils')
const readEditorconfig = require('../readEditorconfig')

describe('steps > readEditorconfig', () => {
  const editorconfigFxt = fixtures('editorconfig/lines/00-base')
  const input = {
    targetPath: '/target',
    configPath: '/configuration-package',
  }

  beforeEach(() => {
    vol.reset()
  })

  it('should read editorconfig from upcoming config', async () => {
    const dir = {
      '/configuration-package/configs/.editorconfig': editorconfigFxt.current,
    }

    vol.fromJSON(dir, input.targetPath)

    const output = await readEditorconfig(input)

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

    const output = await readEditorconfig(input)

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
