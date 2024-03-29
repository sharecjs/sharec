const { EOL } = require('os')
const { fixtures } = require('testUtils')
const { vol } = require('memfs')
const { commonFlow } = require('../../steps')

describe('sharec > install nested configs', () => {
  const packageFxt = fixtures('package/json/01-install')
  const indexFxt = `console.log("hello world")${EOL}`
  const semaphore = {
    start: jest.fn(),
    error: jest.fn(),
    success: jest.fn(),
    fail: jest.fn(),
    warn: jest.fn(),
  }
  const context = {
    targetPath: '/target',
    mergedConfigs: {},
    configs: [],
    cache: {},
    options: {
      cache: true,
    },
  }

  beforeEach(() => {
    jest.clearAllMocks()
    vol.reset()
  })

  it('installs configs to the target project', async () => {
    const dir = {
      '/target/package.json': packageFxt.current,
      '/target/node_modules/awesome-config/package.json': JSON.stringify({
        name: 'awesome-config',
        version: '1.0.0',
      }),
      '/target/node_modules/awesome-config/configs/package.json': packageFxt.upcoming,
      '/target/node_modules/awesome-config/configs/foo/bar/index.js': indexFxt,
    }
    vol.fromJSON(dir, '/')

    await commonFlow(context, semaphore)

    expect(vol.readFileSync('/target/foo/bar/index.js', 'utf8')).toMatchSnapshot()
    expect(vol.readFileSync('/target/package.json', 'utf8')).toMatchSnapshot()
    expect(vol.readdirSync('/target/node_modules/.cache/sharec/foo/bar')).toHaveLength(1)
  })
})
