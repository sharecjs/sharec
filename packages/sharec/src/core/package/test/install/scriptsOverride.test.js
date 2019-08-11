const { vol } = require('memfs')
const { fixtures } = require('testUtils')
const { installPackageJson } = require('../../install')

describe('core > package > install > scripts override >', () => {
  const packageJsonScriptsOverrideFxt = fixtures(
    'package/05-scripts-override',
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
        packageJsonScriptsOverrideFxt.new,
      ),
    }

    vol.fromJSON(dir)

    await installPackageJson({
      configsPath: '/configuration-package',
      configsVersion: '1.0.0',
      targetPath: '/target',
    })

    expect(
      JSON.parse(vol.readFileSync('/target/package.json', 'utf8')),
    ).toEqual(packageJsonScriptsOverrideFxt.result)
  })
})
