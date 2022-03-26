const { vol } = require('memfs')
const readCache = require('../readCache')

describe('steps > readCache', () => {
  let context

  beforeEach(() => {
    vol.reset()
  })

  describe("target doesn't have cache", () => {
    describe('not included', () => {
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

        await expect(readCache(context)).resolves.toEqual(context)
      })
    })

    describe('included', () => {
      beforeEach(() => {
        context = {
          targetPath: '/',
          cache: {},
          options: {
            cache: 'include',
          },
        }

        const dir = {}

        vol.fromJSON(dir, '/')
      })

      it("doesn't modify initial context", async () => {
        expect.assertions(1)

        await expect(readCache(context)).resolves.toEqual(context)
      })
    })
  })

  describe('target has cache', () => {
    describe('not included', () => {
      beforeEach(() => {
        context = {
          targetPath: '/',
          cache: {},
          options: {
            cache: true,
          },
        }

        const dir = {
          '/node_modules/.cache/sharec/.eslintrc': 'foo',
          '/node_modules/.cache/sharec/.editorconfig': 'bar',
          '/node_modules/.cache/sharec/folder/.babelrc': 'baz',
        }

        vol.fromJSON(dir, '/')
      })

      it('add cache to the context', async () => {
        expect.assertions(1)

        await expect(readCache(context)).resolves.toEqual(context)
      })
    })

    describe('included', () => {
      beforeEach(() => {
        context = {
          targetPath: '/',
          cache: {},
          options: {
            cache: 'include',
          },
        }

        const dir = {
          '/.sharec/cache/.eslintrc': 'foo',
          '/.sharec/cache/.editorconfig': 'bar',
          '/.sharec/cache/folder/.babelrc': 'baz',
        }

        vol.fromJSON(dir, '/')
      })

      it('adds cache to the context', async () => {
        expect.assertions(1)

        await expect(readCache(context)).resolves.toEqual(context)
      })
    })
  })
})
