const { vol } = require('memfs')
const writeCache = require('../writeCache')

const fixtures = {
  mergedConfigs: {
    '.eslintrc': 'foo',
    '.editorconfig': 'bar',
    '.babelrc': 'baz',
  },
}

describe('steps > writeCache', () => {
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

  describe("cache isn't allowed", () => {
    beforeEach(() => {
      context = {
        targetPath: '/target',
        options: {
          cache: false,
        },
        mergedConfigs: fixtures.mergedConfigs,
      }
      const dir = {}

      vol.fromJSON(dir, '/')
    })

    it("doesn't write cache", async () => {
      await writeCache(context, semaphore)

      expect(vol.readdirSync('/')).toHaveLength(0)
    })
  })

  describe('cache is allowed', () => {
    describe('not included', () => {
      beforeEach(() => {
        context = {
          targetPath: '/',
          options: {
            cache: true,
          },
          mergedConfigs: fixtures.mergedConfigs,
        }
        const dir = {}

        vol.fromJSON(dir, '/')
      })

      it('writes cache to `node_modules`', async () => {
        await writeCache(context, semaphore)

        expect(vol.readdirSync('/node_modules/.cache/sharec')).toHaveLength(3)
      })
    })

    describe('included', () => {
      beforeEach(() => {
        context = {
          targetPath: '/',
          options: {
            cache: 'include',
          },
          cache: {},
          mergedConfigs: fixtures.mergedConfigs,
        }
        const dir = {}

        vol.fromJSON(dir, '/')
      })

      it("doesn't write cache", async () => {
        await writeCache(context, semaphore)

        expect(vol.readdirSync('/.sharec/cache')).toHaveLength(3)
      })
    })
  })
})
