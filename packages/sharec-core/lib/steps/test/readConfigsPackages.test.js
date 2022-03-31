const { vol } = require('memfs')
const readConfigsPackages = require('../readConfigsPackages')

describe('steps > readConfigsPackages', () => {
  beforeEach(() => {
    vol.reset()
  })

  describe("doesn't have any config", () => {
    it('throws an error', async () => {
      const input = {
        targetPackage: {
          devDependencies: {
            'awesome-config': '1.0.0',
            'second-config': '2.0.0',
          },
          sharec: {
            configs: [],
          },
        },
        targetPath: '/',
        options: {},
      }
      const dir = {}

      vol.fromJSON(dir, '/')

      await expect(readConfigsPackages(input)).rejects.toThrow(expect.any(Error))
    })
  })

  describe('has configs', () => {
    it('reads configs listed in `package.json`', async () => {
      const input = {
        targetPackage: {
          devDependencies: {
            'awesome-config': '1.0.0',
            'second-config': '2.0.0',
          },
          sharec: {
            configs: ['awesome-config', 'second-config'],
          },
        },
        targetPath: '/',
        options: {},
      }
      const dir = {
        'node_modules/awesome-config/package.json': JSON.stringify({
          version: '1.0.0',
        }),
        'node_modules/awesome-config/configs/package.json': 'foo',
        'node_modules/awesome-config/configs/.eslintrc': 'bar',
        'node_modules/awesome-config/configs/package-lock.json': 'baz',
        'node_modules/awesome-config/configs/yarn.lock': 'foo',
        'node_modules/second-config/package.json': JSON.stringify({
          version: '2.0.0',
        }),
        'node_modules/second-config/configs/package.json': 'foo',
        'node_modules/second-config/configs/.eslintrc': 'bar',
        'node_modules/second-config/configs/package-lock.json': 'baz',
        'node_modules/second-config/configs/yarn.lock': 'foo',
      }
      vol.fromJSON(dir, '/')

      const output = await readConfigsPackages(input)

      expect(output).toEqual({
        ...input,
        configs: [
          {
            name: 'awesome-config',
            version: '1.0.0',
            path: '/node_modules/awesome-config',
            configs: {
              'package.json': 'foo',
              '.eslintrc': 'bar',
            },
          },
          {
            name: 'second-config',
            version: '2.0.0',
            path: '/node_modules/second-config',
            configs: {
              'package.json': 'foo',
              '.eslintrc': 'bar',
            },
          },
        ],
      })
    })
  })
})
