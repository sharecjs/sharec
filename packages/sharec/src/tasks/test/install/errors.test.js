const { vol } = require('memfs')
const install = require('../../install')

// FIXME: broken on Windows
describe.skip('tasks > install > errors >', () => {
  beforeEach(() => {
    vol.reset()
  })

  it('should throw an error if configuration package was not found', async () => {
    expect.assertions(1)

    const dir = {
      '/target/package.json': JSON.stringify({}),
    }
    vol.fromJSON(dir, '/')

    try {
      await install({
        upcomingMeta: {
          config: 'awesome-config',
          version: '1.0.0',
        },
        configsPath: '/configuration-package',
        targetPath: '/target',
      })
    } catch (err) {
      console.log(err)
      expect(err.message).toContain('ENOENT')
    }
  })
})
