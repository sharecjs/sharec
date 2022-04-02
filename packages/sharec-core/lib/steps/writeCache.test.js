const { vol } = require('memfs')
const writeCache = require('./writeCache')

const fixtures = {
  mergedConfigs: {
    '.eslintrc': 'foo',
    '.editorconfig': 'bar',
    '.babelrc': 'baz',
  },
}

describe('steps > writeCache', () => {
  beforeEach(() => {
    vol.reset()
  })

  describe("cache isn't allowed", () => {
    it("doesn't write cache", async () => {
      const input = {
        targetPath: '/target',
        options: {
          cache: false,
        },
        mergedConfigs: fixtures.mergedConfigs,
      }
      const dir = {}

      vol.fromJSON(dir, '/')

      await writeCache(input)

      expect(vol.readdirSync('/')).toHaveLength(0)
    })
  })

  describe('cache is allowed', () => {
    describe('not included', () => {
      it('writes cache to `node_modules`', async () => {
        const input = {
          targetPath: '/',
          options: {
            cache: true,
          },
          mergedConfigs: fixtures.mergedConfigs,
        }
        const dir = {}

        vol.fromJSON(dir, '/')

        await writeCache(input)

        expect(vol.readdirSync('/node_modules/.cache/sharec')).toHaveLength(3)
      })
    })

    describe('included', () => {
      it("doesn't write cache", async () => {
        const context = {
          targetPath: '/',
          options: {
            cache: 'include',
          },
          cache: {},
          mergedConfigs: fixtures.mergedConfigs,
        }
        const dir = {}

        vol.fromJSON(dir, '/')

        await writeCache(context)

        expect(vol.readdirSync('/.sharec/cache')).toHaveLength(3)
      })
    })
  })
})
