const { vol } = require('memfs')
const { clearPackageJson } = require('../../remove')

describe('core > package > remove > dependencies >', () => {
  const packageNew = require('fixtures/package/02-dependencies/new.json')
  const packageResult = require('fixtures/package/02-dependencies/result.json')
  const packageRestored = require('fixtures/package/02-dependencies/restored.json')

  beforeEach(() => {
    vol.reset()
  })

  it('should correctly remove package.json dependencies', async () => {
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
