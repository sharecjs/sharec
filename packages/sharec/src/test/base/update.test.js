const { fixtures } = require('testUtils')
const { vol } = require('memfs')
const sharec = require('../../')

describe('sharec > update', () => {
  const packageJsonUpdateFxt = fixtures('package/json/13-base-update', 'json')
  const gitignoreUpdateFxt = fixtures('gitignore/lines/02-base-update')
  const targetProcess = {
    argv: [null, null, 'install'],
    env: {
      PWD: '/configuration-package',
      INIT_CWD: '/target',
    },
  }

  beforeEach(() => {
    vol.reset()
  })

  it('should correctly update configs', async () => {
    expect.assertions(4)

    const dir = {
      '/target/package.json': JSON.stringify(packageJsonUpdateFxt.current),
      '/target/.gitignore': gitignoreUpdateFxt.current,
      '/target/node_modules/.cache/sharec/awesome-config/1.0.0/package.json': JSON.stringify(
        packageJsonUpdateFxt.cached,
      ),
      '/target/node_modules/.cache/sharec/awesome-config/1.0.0/gitignore':
        gitignoreUpdateFxt.cached,
      '/configuration-package/package.json': JSON.stringify({
        name: 'awesome-config',
        version: '2.0.0',
      }),
      '/configuration-package/configs/package.json': JSON.stringify(
        packageJsonUpdateFxt.upcoming,
      ),
      '/configuration-package/configs/gitignore': gitignoreUpdateFxt.upcoming,
    }
    vol.fromJSON(dir, '/')

    await sharec(targetProcess)

    expect(
      JSON.parse(vol.readFileSync('/target/package.json', 'utf8')),
    ).toEqual(packageJsonUpdateFxt.result)
    expect(vol.readFileSync('/target/.gitignore', 'utf8')).toEqual(
      gitignoreUpdateFxt.result,
    )
    expect(
      JSON.parse(
        vol.readFileSync(
          '/target/node_modules/.cache/sharec/awesome-config/2.0.0/package.json',
          'utf8',
        ),
      ),
    ).toEqual(packageJsonUpdateFxt.upcoming)
    expect(
      vol.readFileSync(
        '/target/node_modules/.cache/sharec/awesome-config/2.0.0/gitignore',
        'utf8',
      ),
    ).toEqual(gitignoreUpdateFxt.upcoming)
  })
})
