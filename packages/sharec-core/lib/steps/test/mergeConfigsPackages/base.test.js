const { vol } = require('memfs')
const mergeConfigsPackages = require('../../mergeConfigsPackages')

describe('steps > mergeConfigsPackages > base', () => {
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

    beforeEach(() => {
      context = {
        targetPath: '/target',
        configs: upcomingConfigs,
        mergedConfigs: {},
        options: {},
      }
      const dir = {
        '/target/package.json': JSON.stringify(targetPackage),
      }
      vol.fromJSON(dir, '/configs')
    })

    it('merges configs', async () => {
      const output = await mergeConfigsPackages(context, semaphore)

      expect(output.mergedConfigs).toEqual({
        '/target/.editorconfig': upcomingConfigs[0].configs['.editorconfig'],
      })
    })
  })
})
