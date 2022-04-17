const { vol } = require('memfs')
const writeConfigs = require('../writeConfigs')

describe('steps > writeConfigs', () => {
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

  describe('with configs', () => {
    it('writes merged configs', async () => {
      context = {
        targetPath: '/target',
        mergedConfigs: {
          '/target/foo.txt': 'foo',
          '/target/bar.txt': 'bar',
          '/target/baz.txt': 'baz',
        },
      }

      vol.fromJSON({}, '/')

      await writeConfigs(context, semaphore)

      expect(vol.readFileSync('/target/foo.txt', 'utf8')).toMatchSnapshot()
      expect(vol.readFileSync('/target/bar.txt', 'utf8')).toMatchSnapshot()
      expect(vol.readFileSync('/target/baz.txt', 'utf8')).toMatchSnapshot()
    })
  })

  describe('without configs', () => {
    it('writes merged configs', async () => {
      context = {
        targetPath: '/target',
        mergedConfigs: {},
      }

      vol.fromJSON({}, '/')

      await writeConfigs(context, semaphore)

      expect(vol.readdirSync('/')).toHaveLength(0)
    })
  })
})
