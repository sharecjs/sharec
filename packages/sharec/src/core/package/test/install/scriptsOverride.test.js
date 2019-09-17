const { vol } = require('memfs')
const { fixtures } = require('testUtils')
const { installPackageJson } = require('../../install')

describe('core > package > install > scripts override >', () => {
  const packageJsonScriptsOverrideFxt = fixtures(
    'package/json/05-scripts-override',
    'json',
  )

  beforeEach(() => {
    vol.reset()
  })

  it('should correctly merge package.json scripts section', async () => {
    const dir = {
      '/target/package.json': JSON.stringify(
        packageJsonScriptsOverrideFxt.current,
      ),
      '/configuration-package/package.json': JSON.stringify(
        packageJsonScriptsOverrideFxt.upcoming,
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
    ).toEqual(packageJsonScriptsOverrideFxt.result)
  })
})
