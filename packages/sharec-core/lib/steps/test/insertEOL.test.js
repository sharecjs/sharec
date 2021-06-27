const { createFakeSpinner, createFakePrompt } = require('testUtils')
const insertEOL = require('../insertEOL')

describe('steps > insertEOL', () => {
  let spinner
  let prompt

  beforeEach(() => {
    spinner = createFakeSpinner()
    prompt = createFakePrompt()
  })

  it('should write basic configs from input to target dir', async () => {
    const input = {
      targetPath: '/target',
      mergedConfigs: {
        '/target/.editorconfig': 'bar',
      },
      options: {},
    }

    const output = await insertEOL({ spinner, prompt })(input)

    expect(output.mergedConfigs['/target/.editorconfig']).toEqual('bar\n')
  })
})
