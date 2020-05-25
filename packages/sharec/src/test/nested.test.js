const { fixtures } = require('testUtils')
const { vol } = require('memfs')
const { pwd } = require('shelljs')
const sharec = require('../')

describe('sharec > install nested configs', () => {
  const packageFxt = fixtures('package/json/01-install')
  const indexFxt = 'console.log("hello world")\n'

  const targetProcess = {
    argv: [null, null, 'install'],
    env: {
      INIT_CWD: '/target',
    },
    exit: jest.fn(),
  }

  beforeEach(() => {
    jest.clearAllMocks()
    pwd.mockReturnValueOnce({ stdout: '/configuration-package' })
    vol.reset()
  })

  it('should install configs to the target project', async () => {
    const dir = {
      '/target/package.json': packageFxt.current,
      '/configuration-package/configs/foo/bar/index.js': indexFxt,
      '/configuration-package/package.json': JSON.stringify({
        name: 'awesome-config',
        version: '1.0.0',
      }),
      '/configuration-package/configs/package.json': packageFxt.upcoming,
    }
    vol.fromJSON(dir, '/')

    await sharec(targetProcess)

    expect(vol.readFileSync('/target/foo/bar/index.js', 'utf8')).toWraplessEqual(indexFxt)
    expect(vol.readFileSync('/target/package.json', 'utf8')).toWraplessEqual(packageFxt.result)
    expect(vol.readdirSync('/target/node_modules/.cache/sharec/awesome-config/1.0.0')).toHaveLength(2)
  })
})
