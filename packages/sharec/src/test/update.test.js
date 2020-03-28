const path = require('path')
const { fixtures } = require('testUtils')
const { vol } = require('memfs')
const sharec = require('../')

describe('sharec > update', () => {
  const packageFxt = fixtures('atomic/package/json/02-update')
  const babelFxt = fixtures('atomic/babel/json/05-update')
  const eslintFxt = fixtures('atomic/eslint/json/02-update')
  const gitignoreFxt = fixtures('atomic/gitignore/lines/02-update')
  const npmignoreFxt = fixtures('atomic/npmignore/lines/02-update')
  const yaspellerFxt = fixtures('atomic/yaspeller/json/01-update')

  const targetProcess = {
    argv: [null, null, 'install'],
    env: {
      PWD: '/configuration-package',
      INIT_CWD: '/target',
    },
    exit: jest.fn(),
  }

  beforeEach(() => {
    vol.reset()
  })

  it('should update configs in the target project', async () => {
    expect.assertions(6)

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
      '/configuration-package/configs/package.json': packageFxt.upcoming,
      '/configuration-package/package.json': JSON.stringify(upcomingPackage),
      // Cached
      [path.join(cacheBasePath, '.babelrc')]: babelFxt.cached,
      [path.join(cacheBasePath, '.eslintrc')]: eslintFxt.cached,
      [path.join(cacheBasePath, '.gitignore')]: gitignoreFxt.cached,
      [path.join(cacheBasePath, '.npmignore')]: npmignoreFxt.cached,
      [path.join(cacheBasePath, '.yaspellerrc')]: yaspellerFxt.cached,
      [path.join(cacheBasePath, 'package.json')]: packageFxt.cached,
      // Current
      '/target/.babelrc': babelFxt.current,
      '/target/.eslintrc': eslintFxt.current,
      '/target/.gitignore': gitignoreFxt.current,
      '/target/.npmignore': npmignoreFxt.current,
      '/target/.yaspellerrc': yaspellerFxt.current,
      '/target/package.json': packageFxt.current,
    }
    vol.fromJSON(dir, '/')

    await sharec(targetProcess)

    expect(vol.readFileSync('/target/.babelrc', 'utf8')).toEqual(babelFxt.result)
    expect(vol.readFileSync('/target/.eslintrc', 'utf8')).toEqual(eslintFxt.result)
    expect(vol.readFileSync('/target/.gitignore', 'utf8')).toEqual(gitignoreFxt.result)
    expect(vol.readFileSync('/target/.npmignore', 'utf8')).toEqual(npmignoreFxt.result)
    expect(vol.readFileSync('/target/.yaspellerrc', 'utf8')).toEqual(yaspellerFxt.result)
    expect(vol.readFileSync('/target/package.json', 'utf8')).toEqual(packageFxt.result)
  })
})
