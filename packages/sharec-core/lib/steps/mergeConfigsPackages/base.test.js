const { vol } = require('memfs')
const mergeConfigsPackages = require('../mergeConfigsPackages')

describe('steps > mergeConfigsPackages > base', () => {
  beforeEach(() => {
    vol.reset()
  })

  describe('without sharec config', () => {
    it('merges configs', async () => {
      const targetPackage = {
        name: 'awesome-project',
        version: '0.0.0',
        sharec: {
          configs: ['awesome-config'],
        },
      }
      const upcomingConfigs = [
        {
          name: 'awesome-config',
          path: '/node_modules/awesome-config',
          version: '0.0.0',
          configs: {
            '.editorconfig': 'bar',
          },
        },
      ]
      const input = {
        targetPath: '/target',
        configs: upcomingConfigs,
        mergedConfigs: {},
        options: {},
      }
      const dir = {
        '/target/package.json': JSON.stringify(targetPackage),
      }
      vol.fromJSON(dir, '/configs')

      const output = await mergeConfigsPackages(input)

      expect(output.mergedConfigs).toEqual({
        '/target/.editorconfig': upcomingConfigs[0].configs['.editorconfig'],
      })
    })
  })
})
