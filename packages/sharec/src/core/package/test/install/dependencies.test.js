const { vol } = require('memfs')
const { fixtures } = require('testUtils')
const { installPackageJson } = require('../../install')

describe('core > package > install > dependencies >', () => {
  const packageJsonDependenciesFxt = fixtures('package/02-dependencies', 'json')

  beforeEach(() => {
    vol.reset()
  })

  it('should correctly merge package.json all dependencies sections', async () => {
    const dir = {
      '/target/package.json': JSON.stringify(
        packageJsonDependenciesFxt.current,
      ),
      '/configuration-package/package.json': JSON.stringify(
        packageJsonDependenciesFxt.new,
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
    ).toEqual(packageJsonDependenciesFxt.result)
  })
})
