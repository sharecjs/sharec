const { fixtures } = require('testUtils')
const { vol } = require('memfs')
const { pwd } = require('shelljs')
const sharec = require('../../')

describe('sharec > install > format', () => {
  const packageFxt = fixtures('package/json/06-format')
  const babelFxt = fixtures('babel/json/07-format')
  const eslintFxt = fixtures('eslint/json/04-format')
  const editorconfigFxt = fixtures('editorconfig/lines/01-tabs')

  beforeEach(() => {
    jest.clearAllMocks()
    pwd.mockReturnValueOnce({ stdout: '/configuration-package' })
    vol.reset()
  })

  it('should install configs to the target project and apply formatting rules from upcoming .editorconfig', async () => {
    const targetProcess = {
      argv: [null, null, 'install'],
      env: {
        INIT_CWD: '/target',
      },
      exit: jest.fn(),
    }
    const dir = {
      '/target/package.json': packageFxt.current,
      '/target/.eslintrc': eslintFxt.current,
      '/target/.babelrc': babelFxt.current,
      '/configuration-package/package.json': JSON.stringify({
        name: 'awesome-config',
        version: '1.0.0',
      }),
      '/configuration-package/configs/.eslintrc': eslintFxt.upcoming,
      '/configuration-package/configs/.babelrc': babelFxt.upcoming,
      '/configuration-package/configs/.editorconfig': editorconfigFxt.current,
      '/configuration-package/configs/package.json': packageFxt.upcoming,
    }
    vol.fromJSON(dir, '/')

    await sharec(targetProcess)

    expect(vol.readFileSync('/target/.editorconfig', 'utf8')).toWraplessEqual(editorconfigFxt.current)
    expect(vol.readFileSync('/target/.eslintrc', 'utf8')).toWraplessEqual(eslintFxt.result)
    expect(vol.readFileSync('/target/.babelrc', 'utf8')).toWraplessEqual(babelFxt.result)
    expect(vol.readFileSync('/target/package.json', 'utf8')).toWraplessEqual(packageFxt.result)
  })
})
