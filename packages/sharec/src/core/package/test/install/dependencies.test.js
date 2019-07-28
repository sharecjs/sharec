const { vol } = require('memfs')
const { installPackageJson } = require('../../install')

describe('core > package > install > dependencies >', () => {
  const packageCurrent = require('fixtures/package/02-dependencies/current.json')
  const packageNew = require('fixtures/package/02-dependencies/new.json')
  const packageResult = require('fixtures/package/02-dependencies/result.json')

  beforeEach(() => {
    vol.reset()
  })

  it('should correctly merge package.json all dependencies sections', async () => {
    const dir = {
      '/target/package.json': JSON.stringify(packageCurrent),
      '/configuration-package/package.json': JSON.stringify(packageNew),
    }

    vol.fromJSON(dir)

    await installPackageJson({
      configsPath: '/configuration-package',
      configsVersion: '1.0.0',
      targetPath: '/target',
    })

    expect(
      JSON.parse(vol.readFileSync('/target/package.json', 'utf8')),
    ).toEqual(packageResult)
  })
})
