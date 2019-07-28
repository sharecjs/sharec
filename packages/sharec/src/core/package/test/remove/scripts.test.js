const { vol } = require('memfs')
const { clearPackageJson } = require('../../remove')

describe('core > package > remove > scripts >', () => {
  const packageNew = require('fixtures/package/01/new.json')
  const packageResult = require('fixtures/package/01/result.json')
  const packageRestored = require('fixtures/package/01/restored.json')

  beforeEach(() => {
    vol.reset()
  })

  it('should correctly remove package.json scripts', async () => {
    const dir = {
      '/target/package.json': JSON.stringify(packageResult),
      '/configuration-package/package.json': JSON.stringify(packageNew),
    }

    vol.fromJSON(dir)

    await clearPackageJson('/configuration-package', '/target')

    expect(
      JSON.parse(vol.readFileSync('/target/package.json', 'utf8')),
    ).toEqual(packageRestored)
  })
})
