const { vol } = require('memfs')
const { sharec } = require('../')

describe('sharec > static', () => {
  const input = {
    targetPath: '/target',
    configPath: '/configuration-package',
  }

  beforeEach(() => {
    jest.clearAllMocks()
    vol.reset()
  })

  it('should not overwrite static files if they were changed by user', async () => {
    const dir = {
      '/configuration-package/configs/foo.js': 'console.log("foo");\n',
      '/configuration-package/package.json': JSON.stringify({
        name: 'awesome-config',
        version: '2.0.0',
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

    await sharec(input)

    expect(vol.readFileSync('/target/foo.js', 'utf8')).toWraplessEqual('console.log("baz");\n')
  })
})
