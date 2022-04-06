const { vol } = require('memfs')
const mergeConfigsPackages = require('../../mergeConfigsPackages')

describe('steps > mergeConfigsPackages > multiple', () => {
  const semaphore = {
    start: jest.fn(),
    success: jest.fn(),
    error: jest.fn(),
    fail: jest.fn(),
  }
  let context

  beforeEach(() => {
    jest.clearAllMocks()
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
      context = {
        targetPath: '/',
        configs: upcomingConfigs,
        mergedConfigs: {},
        options: {},
      }
      const dir = {
        '/package.json': JSON.stringify(targetPackage),
      }
      vol.fromJSON(dir, '/configs')

      const output = await mergeConfigsPackages(context, semaphore)

      expect(output.mergedConfigs['/.eslintrc']).toMatchSnapshot()
    })
  })
})
