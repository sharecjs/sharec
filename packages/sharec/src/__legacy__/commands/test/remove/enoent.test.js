const { fixture } = require('testUtils')
const { vol } = require('memfs')
const remove = require('../../remove')

describe('commands > remove > enoent > ', () => {
  const eslint04 = fixture('eslint/json/eslintrc_04.json', 'json')

  beforeEach(() => {
    vol.reset()
  })

  it('should should stops if configuration directory is not exists', async () => {
    expect.assertions(2)

    const packageJson = {}
    const dir = {
      '/target/package.json': JSON.stringify(packageJson),
      '/target/.eslintrc': JSON.stringify(eslint04),
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
