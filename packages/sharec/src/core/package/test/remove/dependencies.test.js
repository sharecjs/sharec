const { vol } = require('memfs')
const { fixture } = require('testUtils')
const { clearPackageJson } = require('../../remove')

describe('core > package > remove > dependencies >', () => {
  const packageNew = fixture('package/02-dependencies/upcoming.json', 'json')
  const packageResult = fixture('package/02-dependencies/result.json', 'json')
  const packageRestored = fixture(
    'package/02-dependencies/restored.json',
    'json',
  )

  beforeEach(() => {
    vol.reset()
  })

  it('should correctly remove package.json dependencies', async () => {
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
