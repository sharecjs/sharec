const { vol } = require('memfs')
const { pwd } = require('shelljs')
const sharec = require('../')

describe('sharec > static', () => {
  const targetProcess = {
    argv: [null, null, null],
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

  it('should not overwrite static files if they were changed by user', async () => {
    const dir = {
      '/configuration-package/foo.js': 'console.log("foo");\n',
      '/configuration-package/package.json': JSON.stringify({
        name: 'awesome-config',
        version: '1.0.0',
      }),
      '/target/node_modules/.cache/sharec/awesome-config/1.0.0/foo.js': 'console.log("bar");\n',
      '/target/foo.js': 'console.log("baz");\n',
      '/target/package.json': JSON.stringify(
        {
          sharec: {
            config: 'awesome-config',
            version: '1.0.0',
          },
        },
        null,
        2,
      ),
    }
    vol.fromJSON(dir, '/')

    await sharec(targetProcess)

    expect(vol.readFileSync('/target/foo.js', 'utf8')).toWraplessEqual('console.log("baz");\n')
  })
})
