const { vol } = require('memfs')
const { processPackageJson } = require('core/packageProcessor')

describe('core > packageProcessor >', () => {
  const packageJson01 = require('fixtures/package/package_01.json')
  const packageJson02 = require('fixtures/package/package_02.json')

  describe('processPackageJson', () => {
    it('should merge exist package.json with upcoming from configs', async () => {
      const dir = {
        '/target/package.json': JSON.stringify(packageJson01, null, 2),
        '/configs/package.json': JSON.stringify(packageJson02, null, 2),
      }
      vol.fromJSON(dir, '/')

      vol.toJSON()

      await processPackageJson('/configs', '/target')

      expect(
        JSON.parse(vol.readFileSync('/target/package.json', 'utf8')),
      ).toMatchSnapshot()
    })
  })
})
