const { fixture } = require('testUtils')
const { vol } = require('memfs')
const remove = require('../../remove')

describe('commands > remove > not installed > ', () => {
  const eslint04 = fixture('eslint/json/eslintrc_04.json', 'json')
  const eslint05 = fixture('eslint/json/eslintrc_05.json', 'json')

  beforeEach(() => {
    vol.reset()
  })

  it('should not do anything if configs were not injected', async () => {
    expect.assertions(2)

    const packageJson = {}
    const dir = {
      '/target/package.json': JSON.stringify(packageJson),
      '/target/.eslintrc': JSON.stringify(eslint04),
      '/configuration-package/.eslintrc': JSON.stringify(eslint05),
    }

    vol.fromJSON(dir)

    await remove({
      targetPath: '/target',
      configsPath: '/configuration-package',
    })

    expect(JSON.parse(vol.readFileSync('/target/.eslintrc'))).toEqual(eslint04)
    expect(
      JSON.parse(vol.readFileSync('/target/package.json')).sharec,
    ).toBeUndefined()
  })
})
