const { vol } = require('memfs')
const readConfigsPackages = require('../readConfigsPackages')

describe('steps > readConfigsPackages', () => {
  const semaphore = {
    start: jest.fn(),
    success: jest.fn(),
    error: jest.fn(),
    fail: jest.fn(),
    warn: jest.fn(),
  }
  let context

  beforeEach(() => {
    jest.clearAllMocks()
    vol.reset()
  })

  describe("doesn't have any config", () => {
    beforeEach(() => {
      context = {
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
    })

    it('triggers `warn` signal', async () => {
      expect.assertions(1)

      await readConfigsPackages(context, semaphore)

      expect(semaphore.warn).toBeCalled()
    })

    it("doesn't modify the context", async () => {
      expect.assertions(1)

      await expect(readConfigsPackages({ ...context }, semaphore)).resolves.toEqual(context)
    })
  })

  describe('has configs', () => {
    beforeEach(() => {
      context = {
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
    })

    it("doesn't trigger `fail` signal", async () => {
      await readConfigsPackages(context, semaphore)

      expect(semaphore.fail).not.toBeCalled()
    })

    it('adds listed configs to the context', async () => {
      const output = await readConfigsPackages(context, semaphore)

      expect(output.configs).toMatchSnapshot()
    })
  })
})
