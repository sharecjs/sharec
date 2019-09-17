const { vol } = require('memfs')
const install = require('../../install')

describe('commands > install > enoent >', () => {
  beforeEach(() => {
    vol.reset()
  })

  describe('configuration processing', () => {
    it('should stops if configuration directory is not exists', async () => {
      expect.assertions(1)

      const packageJson = {}
      const dir = {
        '/target/package.json': JSON.stringify(packageJson),
        '/configuration-package/package.json': JSON.stringify({
          version: '1.0.0',
        }),
        '/configuration-package/.editorconfig': 'bar',
      }

      vol.fromJSON(dir, '/')

      await install({
        configsPath: '/configuration-package',
        targetPath: '/target',
      })

      expect(
        JSON.parse(vol.readFileSync('/target/package.json', 'utf8')),
      ).toEqual(packageJson)
    })
  })
})
