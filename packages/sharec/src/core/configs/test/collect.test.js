const { vol } = require('memfs')
const { collectConfigsPaths } = require('../collect')

describe('core > collector >', () => {
  beforeEach(() => {
    vol.reset()
  })

  describe('collectConfigsPaths', () => {
    it('should collect all configs paths from given configuration package', async () => {
      expect.assertions(1)

      const dir = {
        'package.json': 'foo',
        '.eslintrc': 'bar',
        'package-lock.json': 'baz',
        'yarn.lock': 'foo',
      }
      vol.fromJSON(dir, '/configs')

      const paths = await collectConfigsPaths('/configs')

      expect(paths).toEqual([
        '.eslintrc',
        'package.json'
      ])
    })
  })
})
