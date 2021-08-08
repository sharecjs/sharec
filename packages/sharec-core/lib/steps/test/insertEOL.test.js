const insertEOL = require('../insertEOL')

describe('steps > insertEOL', () => {
  it('should write basic configs from input to target dir', async () => {
    const input = {
      targetPath: '/target',
      mergedConfigs: {
        '/target/.editorconfig': 'bar',
      },
      options: {},
    }

    const output = await insertEOL(input)

    expect(output.mergedConfigs['/target/.editorconfig']).toEqual('bar\n')
  })
})
