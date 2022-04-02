const { vol } = require('memfs')
const applyRuntimeHook = require('./applyRuntimeHook')

describe('steps > applyRuntimeHook', () => {
  let context

  beforeEach(() => {
    vol.reset()
  })

  describe('without runtime config', () => {
    beforeEach(() => {
      context = {
        targetPath: '/',
        cache: {},
        options: {
          cache: true,
        },
      }

      const dir = {}

      vol.fromJSON(dir, '/')
    })

    it("doesn't modify initial context", async () => {
      expect.assertions(1)

      const hook = applyRuntimeHook('beforeMerge')
      const res = await hook(context)

      expect(res.mergedConfigs).toBeUndefined()
    })
  })

  describe('with runtime config', () => {
    beforeEach(() => {
      context = {
        targetPath: '/',
        cache: {},
        mergedConfigs: {
          '/.gitignore': 'original',
        },
        runtimeConfig: {
          afterMerge: context => {
            for (const key in context.mergedConfigs) {
              context.mergedConfigs[key] = 'replaced'
            }

            return context
          },
        },
        options: {
          cache: true,
        },
      }

      const dir = {}

      vol.fromJSON(dir, '/')
    })

    it('applies hook to the given context', async () => {
      expect.assertions(1)

      const hook = applyRuntimeHook('afterMerge')
      const res = await hook(context)

      expect(res.mergedConfigs).toEqual({
        '/.gitignore': 'replaced',
      })
    })
  })
})
