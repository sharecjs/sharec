const { vol } = require('memfs')
const readTargetPackage = require('../readTargetPackage')

describe('steps > readTargetPackage', () => {
  const semaphore = {
    start: jest.fn(),
    success: jest.fn(),
    error: jest.fn(),
    fail: jest.fn(),
  }
  const context = { targetPath: '/configs' }

  beforeEach(() => {
    jest.clearAllMocks()
    vol.reset()
  })

  describe('has `package.json`', () => {
    const packageJson = {
      foo: 'bar',
      bar: 'baz',
      baz: 'foo',
    }

    beforeEach(() => {
      const dir = {
        'package.json': JSON.stringify(packageJson),
      }

      vol.fromJSON(dir, context.targetPath)
    })

    it("doesn't trigger `fail` signal", async () => {
      await readTargetPackage(context, semaphore)

      expect(semaphore.fail).not.toBeCalled()
    })

    it('reads package.json', async () => {
      const output = await readTargetPackage(context, semaphore)

      expect(output).toEqual({
        ...context,
        targetPackage: packageJson,
      })
    })
  })

  describe("doesn't have `package.json`", () => {
    beforeEach(() => {
      const dir = {}

      vol.fromJSON(dir, context.targetPath)
    })

    it('triggers `fail` signal', async () => {
      await readTargetPackage(context, semaphore)

      expect(semaphore.fail).toBeCalled()
    })

    it("doesn't modify the context", async () => {
      const output = await readTargetPackage({ ...context }, semaphore)

      expect(output).toEqual(context)
    })
  })
})
