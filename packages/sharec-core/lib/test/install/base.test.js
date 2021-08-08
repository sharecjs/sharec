const { fixtures } = require('testUtils')
const { vol } = require('memfs')
const { sharec } = require('../../')

describe('sharec > install', () => {
  const packageFxt = fixtures('package/json/01-install')
  const babelFxt = fixtures('babel/json/00-base')
  const eslintFxt = fixtures('eslint/json/01-base')
  const npmignoreFxt = fixtures('npmignore/lines/00-base')
  const gitignoreFxt = fixtures('gitignore/lines/00-base')

  beforeEach(() => {
    jest.clearAllMocks()
    vol.reset()
  })

  it('should install configs to the target project', async () => {
    const input = {
      targetPath: '/target',
      configPath: '/configuration-package',
    }
    const dir = {
      '/target/.eslintrc': eslintFxt.current,
      '/target/.babelrc': babelFxt.current,
      '/target/.npmignore': npmignoreFxt.current,
      '/target/.gitignore': gitignoreFxt.current,
      '/target/package.json': packageFxt.current,
      '/configuration-package/configs/.eslintrc': eslintFxt.upcoming,
      '/configuration-package/configs/.editorconfig': 'bar',
      '/configuration-package/configs/.babelrc': babelFxt.upcoming,
      '/configuration-package/configs/npmignore': npmignoreFxt.upcoming,
      '/configuration-package/configs/gitignore': gitignoreFxt.upcoming,
      '/configuration-package/package.json': JSON.stringify({
        name: 'awesome-config',
        version: '1.0.0',
      }),
      '/configuration-package/configs/package.json': packageFxt.upcoming,
    }
    vol.fromJSON(dir, '/')

    await sharec(input)

    expect(vol.readFileSync('/target/.eslintrc', 'utf8')).toWraplessEqual(eslintFxt.result)
    expect(vol.readFileSync('/target/.babelrc', 'utf8')).toWraplessEqual(babelFxt.result)
    expect(vol.readFileSync('/target/.editorconfig', 'utf8')).toWraplessEqual('bar\n')
    expect(vol.readFileSync('/target/.gitignore', 'utf8')).toWraplessEqual(gitignoreFxt.result)
    expect(vol.readFileSync('/target/.npmignore', 'utf8')).toWraplessEqual(npmignoreFxt.result)
    expect(vol.readFileSync('/target/package.json', 'utf8')).toWraplessEqual(packageFxt.result)
    expect(vol.readdirSync('/target/node_modules/.cache/sharec/awesome-config/1.0.0')).toHaveLength(6)
  })

  it('should place cache in target project if includeCache mode is active', async (done) => {
    const input = {
      targetPath: '/target',
      configPath: '/configuration-package',
      includeCache: true,
    }
    const dir = {
      '/target/.eslintrc': eslintFxt.current,
      '/target/.babelrc': babelFxt.current,
      '/target/.npmignore': npmignoreFxt.current,
      '/target/.gitignore': gitignoreFxt.current,
      '/target/package.json': packageFxt.current,
      '/configuration-package/configs/.eslintrc': eslintFxt.upcoming,
      '/configuration-package/configs/.editorconfig': 'bar',
      '/configuration-package/configs/.babelrc': babelFxt.upcoming,
      '/configuration-package/configs/npmignore': npmignoreFxt.upcoming,
      '/configuration-package/configs/gitignore': gitignoreFxt.upcoming,
      '/configuration-package/package.json': JSON.stringify({
        name: 'awesome-config',
        version: '1.0.0',
      }),
      '/configuration-package/configs/package.json': packageFxt.upcoming,
    }
    vol.fromJSON(dir, '/')

    await sharec(input)

    expect(vol.readFileSync('/target/.eslintrc', 'utf8')).toWraplessEqual(eslintFxt.result)
    expect(vol.readFileSync('/target/.babelrc', 'utf8')).toWraplessEqual(babelFxt.result)
    expect(vol.readFileSync('/target/.editorconfig', 'utf8')).toWraplessEqual('bar\n')
    expect(vol.readFileSync('/target/.gitignore', 'utf8')).toWraplessEqual(gitignoreFxt.result)
    expect(vol.readFileSync('/target/.npmignore', 'utf8')).toWraplessEqual(npmignoreFxt.result)
    expect(vol.readFileSync('/target/package.json', 'utf8')).toWraplessEqual(packageFxt.result)
    expect(vol.readdirSync('/target/.sharec/.cache/awesome-config/1.0.0')).toHaveLength(6)

    try {
      vol.readdirSync('/target/node_modules/.cache/sharec/awesome-config/1.0.0')
    } catch (err) {
      done()
    }
  })
})
