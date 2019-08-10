const { vol } = require('memfs')
const { fixture } = require('testUtils')
const { installPackageJson } = require('../../install')

describe('core > package > install > scripts >', () => {
  const packageCurrent = fixture('package/01-scripts/current.json', 'json')
  const packageNew = fixture('package/01-scripts/new.json', 'json')
  const packageResult = fixture('package/01-scripts/result.json', 'json')

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
