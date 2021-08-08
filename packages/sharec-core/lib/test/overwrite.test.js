const { fixtures } = require('testUtils')
const { vol } = require('memfs')
const { sharec } = require('../')

describe('sharec > overwrite', () => {
  const packageFxt = fixtures('package/json/04-overwrite')
  const babelFxt = fixtures('babel/json/00-base')
  const eslintFxt = fixtures('eslint/json/01-base')
  const npmignoreFxt = fixtures('npmignore/lines/00-base')
  const gitignoreFxt = fixtures('gitignore/lines/00-base')

  const input = {
    targetPath: '/target',
    configPath: '/configuration-package',
    overwrite: true,
  }

  beforeEach(() => {
    jest.clearAllMocks()
    vol.reset()
  })

  it('should overwrite current with upcoming in overwrite mode', async (done) => {
    const dir = {
      '/configuration-package/configs/.eslintrc': eslintFxt.upcoming,
      '/configuration-package/configs/.babelrc': babelFxt.upcoming,
      '/configuration-package/configs/npmignore': npmignoreFxt.upcoming,
      '/configuration-package/configs/gitignore': gitignoreFxt.upcoming,
      '/configuration-package/configs/package.json': packageFxt.upcoming,
      '/configuration-package/package.json': JSON.stringify({
        name: 'awesome-config',
        version: '1.0.0',
      }),
      '/target/.eslintrc': eslintFxt.current,
      '/target/.babelrc': babelFxt.current,
      '/target/.npmignore': npmignoreFxt.current,
      '/target/.gitignore': gitignoreFxt.current,
      '/target/package.json': packageFxt.current,
    }
    vol.fromJSON(dir, '/')

    await sharec(input)

    expect(vol.readFileSync('/target/.babelrc', 'utf8')).toWraplessEqual(babelFxt.upcoming)
    expect(vol.readFileSync('/target/.eslintrc', 'utf8')).toWraplessEqual(eslintFxt.upcoming)
    expect(vol.readFileSync('/target/.gitignore', 'utf8')).toWraplessEqual(gitignoreFxt.upcoming)
    expect(vol.readFileSync('/target/.npmignore', 'utf8')).toWraplessEqual(npmignoreFxt.upcoming)
    expect(vol.readFileSync('/target/package.json', 'utf8')).toWraplessEqual(packageFxt.result)

    try {
      vol.readdirSync('/target/node_modules/.cache/sharec/awesome-config/1.0.0')
    } catch (err) {
      done()
    }
  })
})
