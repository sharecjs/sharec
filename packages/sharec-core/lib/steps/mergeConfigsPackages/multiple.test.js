const { vol } = require('memfs')
const mergeConfigsPackages = require('../mergeConfigsPackages')

describe('steps > mergeConfigsPackages > multiple', () => {
  beforeEach(() => {
    vol.reset()
  })

  describe('without sharec config', () => {
    it('merges configs sequently', async () => {
      const targetPackage = {
        name: 'awesome-project',
        version: '0.0.0',
        sharec: {
          configs: ['awesome-config', 'next-config'],
        },
      }
      const upcomingConfigs = [
        {
          name: 'awesome-config',
          path: '/node_modules/awesome-config',
          version: '0.0.0',
          configs: {
            '.eslintrc': JSON.stringify({
              env: {
                browser: true,
                es6: true,
              },
            }),
          },
        },
        {
          name: 'next-config',
          path: '/node_modules/next-config',
          version: '0.0.0',
          configs: {
            '.eslintrc': JSON.stringify({
              env: {
                node: true,
                jest: true,
              },
            }),
          },
        },
      ]
      const input = {
        targetPath: '/',
        configs: upcomingConfigs,
        mergedConfigs: {},
        options: {},
      }
      const dir = {
        '/package.json': JSON.stringify(targetPackage),
      }
      vol.fromJSON(dir, '/configs')

      const output = await mergeConfigsPackages(input)

      expect(output.mergedConfigs).toEqual({
        '/.eslintrc': JSON.stringify(
          {
            env: {
              browser: true,
              es6: true,
              node: true,
              jest: true,
            },
          },
          null,
          2,
        ),
      })
    })
  })
})
