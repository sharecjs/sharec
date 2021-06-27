const { fixtures } = require('testUtils')
const { vol } = require('memfs')
const { pwd } = require('shelljs')
const sharec = require('../')

describe('sharec > disappear', () => {
  const packageFxt = fixtures('package/json/03-disappear')
  const babelFxt = fixtures('babel/json/06-disappear')
  const eslintFxt = fixtures('eslint/json/03-disappear')
  const yaspellerFxt = fixtures('yaspeller/json/02-disappear')
  const npmignoreFxt = fixtures('npmignore/lines/00-base')
  const gitignoreFxt = fixtures('gitignore/lines/00-base')

  const targetProcess = {
    argv: [null, null, '--disappear'],
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

  it('should install configs to the target project without cache and meta writing', async (done) => {
    const dir = {
      '/configuration-package/configs/.eslintrc': eslintFxt.upcoming,
      '/configuration-package/configs/.babelrc': babelFxt.upcoming,
      '/configuration-package/configs/.yaspellerrc': yaspellerFxt.upcoming,
      '/configuration-package/configs/package.json': packageFxt.upcoming,
      '/configuration-package/package.json': JSON.stringify({
        name: 'awesome-config',
        version: '1.0.0',
      }),
      '/configuration-package/configs/npmignore': npmignoreFxt.upcoming,
      '/configuration-package/configs/gitignore': gitignoreFxt.upcoming,
      '/target/.npmignore': npmignoreFxt.current,
      '/target/.gitignore': gitignoreFxt.current,
      '/target/.eslintrc': eslintFxt.current,
      '/target/.babelrc': babelFxt.current,
      '/target/.yaspellerrc': yaspellerFxt.current,
      '/target/package.json': packageFxt.current,
    }
    vol.fromJSON(dir, '/')

    await sharec(targetProcess)

    expect(vol.readFileSync('/target/.babelrc', 'utf8')).toWraplessEqual(babelFxt.result)
    expect(vol.readFileSync('/target/.eslintrc', 'utf8')).toWraplessEqual(eslintFxt.result)
    expect(vol.readFileSync('/target/.yaspellerrc', 'utf8')).toWraplessEqual(yaspellerFxt.result)
    expect(vol.readFileSync('/target/package.json', 'utf8')).toWraplessEqual(packageFxt.result)
    expect(vol.readFileSync('/target/.gitignore', 'utf8')).toWraplessEqual(gitignoreFxt.result)
    expect(vol.readFileSync('/target/.npmignore', 'utf8')).toWraplessEqual(npmignoreFxt.result)

    try {
      vol.readdirSync('/target/node_modules/.cache/sharec/awesome-config/1.0.0')
    } catch (err) {
      done()
    }
  })
})
