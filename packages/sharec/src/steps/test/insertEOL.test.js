const { createFakeSpinner } = require('testUtils')
const insertEOL = require('../insertEOL')

describe('steps > insertEOL', () => {
  it('should write basic configs from input to target dir', async () => {
    const spinner = createFakeSpinner()
    const input = {
      targetPath: '/target',
      mergedConfigs: {
        '/target/.editorconfig': 'bar',
      },
      options: {},
    }

    const output = await insertEOL(spinner)(input)

    expect(output.mergedConfigs['/target/.editorconfig']).toEqual('bar\n')
  })
})
