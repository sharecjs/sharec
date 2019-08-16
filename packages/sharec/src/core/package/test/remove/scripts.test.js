const { vol } = require('memfs')
const { fixture } = require('testUtils')
const { clearPackageJson } = require('../../remove')

describe('core > package > remove > scripts >', () => {
  const packageNew = fixture('package/01-scripts/new.json', 'json')
  const packageResult = fixture('package/01-scripts/result.json', 'json')
  const packageRestored = fixture('package/01-scripts/restored.json', 'json')

  beforeEach(() => {
    vol.reset()
  })

  it('should correctly remove package.json scripts', async () => {
    const dir = {
      '/target/package.json': JSON.stringify(packageResult),
      '/configuration-package/package.json': JSON.stringify(packageNew),
    }

    vol.fromJSON(dir)

    await clearPackageJson({
      configsPath: '/configuration-package',
      targetPath: '/target',
    })

    expect(
      JSON.parse(vol.readFileSync('/target/package.json', 'utf8')),
    ).toEqual(packageRestored)
  })
})
