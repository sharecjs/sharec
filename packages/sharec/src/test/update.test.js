const path = require('path')
const { fixtures } = require('testUtils')
const { vol } = require('memfs')
const { pwd } = require('shelljs')
const sharec = require('../')

describe('sharec > update', () => {
  const packageFxt = fixtures('atomic/package/json/02-update')
  const babelFxt = fixtures('atomic/babel/json/05-update')
  const eslintFxt = fixtures('atomic/eslint/json/02-update')
  const gitignoreFxt = fixtures('atomic/gitignore/lines/02-update')
  const npmignoreFxt = fixtures('atomic/npmignore/lines/02-update')
  const yaspellerFxt = fixtures('atomic/yaspeller/json/01-update')
  const defaultJsonFxt = fixtures('atomic/default/json/00-base')
  const defaultYamlFxt = fixtures('atomic/default/yaml/00-base')

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

  it('should update configs in the target project', async () => {
    const cacheBasePath = '/target/node_modules/.cache/sharec/awesome-config/1.0.0'
    const upcomingPackage = {
      name: 'awesome-config',
      version: '2.0.0',
    }
    const dir = {
      // Upcoming
      '/configuration-package/configs/.babelrc': babelFxt.upcoming,
      '/configuration-package/configs/.eslintrc': eslintFxt.upcoming,
      '/configuration-package/configs/.gitignore': gitignoreFxt.upcoming,
      '/configuration-package/configs/.npmignore': npmignoreFxt.upcoming,
      '/configuration-package/configs/.yaspellerrc': yaspellerFxt.upcoming,
      '/configuration-package/configs/foo.json': defaultJsonFxt.upcoming,
      '/configuration-package/configs/foo.yaml': defaultYamlFxt.upcoming,
      '/configuration-package/configs/package.json': packageFxt.upcoming,
      '/configuration-package/package.json': JSON.stringify(upcomingPackage),
      // Cached
      [path.join(cacheBasePath, '.babelrc')]: babelFxt.cached,
      [path.join(cacheBasePath, '.eslintrc')]: eslintFxt.cached,
      [path.join(cacheBasePath, '.gitignore')]: gitignoreFxt.cached,
      [path.join(cacheBasePath, '.npmignore')]: npmignoreFxt.cached,
      [path.join(cacheBasePath, '.yaspellerrc')]: yaspellerFxt.cached,
      [path.join(cacheBasePath, 'foo.json')]: defaultJsonFxt.cached,
      [path.join(cacheBasePath, 'foo.yaml')]: defaultYamlFxt.cached,
      [path.join(cacheBasePath, 'package.json')]: packageFxt.cached,
      // Current
      '/target/.babelrc': babelFxt.current,
      '/target/.eslintrc': eslintFxt.current,
      '/target/.gitignore': gitignoreFxt.current,
      '/target/.npmignore': npmignoreFxt.current,
      '/target/.yaspellerrc': yaspellerFxt.current,
      '/target/foo.json': defaultJsonFxt.current,
      '/target/foo.yaml': defaultYamlFxt.current,
      '/target/package.json': packageFxt.current,
    }
    vol.fromJSON(dir, '/')

    await sharec(targetProcess)

    expect(vol.readFileSync('/target/.babelrc', 'utf8')).toWraplessEqual(babelFxt.result)
    expect(vol.readFileSync('/target/.eslintrc', 'utf8')).toWraplessEqual(eslintFxt.result)
    expect(vol.readFileSync('/target/.gitignore', 'utf8')).toWraplessEqual(gitignoreFxt.result)
    expect(vol.readFileSync('/target/.npmignore', 'utf8')).toWraplessEqual(npmignoreFxt.result)
    expect(vol.readFileSync('/target/.yaspellerrc', 'utf8')).toWraplessEqual(yaspellerFxt.result)
    expect(vol.readFileSync('/target/foo.json', 'utf8')).toWraplessEqual(defaultJsonFxt.result)
    expect(vol.readFileSync('/target/foo.yaml', 'utf8')).toWraplessEqual(defaultYamlFxt.result)
    expect(vol.readFileSync('/target/package.json', 'utf8')).toWraplessEqual(packageFxt.result)
  })
})
