const { vol } = require('memfs')
const { installPackageJson } = require('../../install')

describe('core > package > install > scripts >', () => {
  const packageCurrent = require('fixtures/package/01/current.json')
  const packageNew = require('fixtures/package/01/new.json')
  const packageResult = require('fixtures/package/01/result.json')

  beforeEach(() => {
    vol.reset()
  })

  it('should correctly merge package.json scripts section', async () => {
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
