const { vol } = require('memfs')
const { fixtures } = require('testUtils')
const { installPackageJson } = require('../../install')

describe('core > package > install > dependencies >', () => {
  const packageJsonDependenciesFxt = fixtures(
    'package/json/02-dependencies',
    'json',
  )

  beforeEach(() => {
    vol.reset()
  })

  it('should correctly merge package.json all dependencies sections', async () => {
    const dir = {
      '/target/package.json': JSON.stringify(
        packageJsonDependenciesFxt.current,
      ),
      '/configuration-package/package.json': JSON.stringify(
        packageJsonDependenciesFxt.upcoming,
      ),
    }

    vol.fromJSON(dir)

    await installPackageJson({
      upcomingMeta: {
        config: 'awesome-config',
        version: '1.0.0',
      },
      configsPath: '/configuration-package',
      targetPath: '/target',
    })

    expect(
      JSON.parse(vol.readFileSync('/target/package.json', 'utf8')),
    ).toEqual(packageJsonDependenciesFxt.result)
  })
})
