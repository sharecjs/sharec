const { vol } = require('memfs')
const writeLockdata = require('../writeLockdata')

describe('steps > writeLockdata', () => {
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

  describe('has merged configs', () => {
    it('inserts lock data', async () => {
      context = {
        targetPath: '/',
        configs: [
          {
            name: 'foo',
            version: '1.0.0',
          },
          {
            name: 'bar',
            version: '2.0.0',
          },
        ],
        mergedConfigs: {
          '.gitignore': 'foo',
        },
      }
      const dir = {
        '/package.json': JSON.stringify({
          sharec: {
            configs: ['foo', 'bar'],
          },
        }),
      }

      vol.fromJSON(dir, '/')

      await writeLockdata(context, semaphore)

      expect(JSON.parse(vol.readFileSync('/package.json', 'utf8'))).toEqual({
        sharec: {
          configs: ['foo', 'bar'],
          locked: {
            foo: '1.0.0',
            bar: '2.0.0',
          },
        },
      })
    })
  })

  describe("doesn't have any merged config", () => {
    it("doesn't insert lock data", async () => {
      context = {
        targetPath: '/',
        configs: [
          {
            name: 'foo',
            version: '1.0.0',
          },
          {
            name: 'bar',
            version: '2.0.0',
          },
        ],
        mergedConfigs: {},
      }
      const dir = {
        '/package.json': JSON.stringify({
          sharec: {
            configs: ['foo', 'bar'],
          },
        }),
      }

      vol.fromJSON(dir, '/')

      await writeLockdata(context, semaphore)

      expect(JSON.parse(vol.readFileSync('/package.json', 'utf8'))).toEqual({
        sharec: {
          configs: ['foo', 'bar'],
        },
      })
    })
  })
})
