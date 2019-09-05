const { fixtures } = require('testUtils')
const { vol } = require('memfs')
const install = require('../../install')

describe('commands > install > ovewrite preventing > ', () => {
  const packageJsonPreventOverwriteFxt = fixtures(
    'package/json/07-prevent-overwrite',
    'json',
  )

  beforeEach(() => {
    vol.reset()
  })

  it('should not do anything if configs versions are equal already injected', async () => {
    expect.assertions(1)

    const dir = {
      '/target/node_modules/.cache/sharec/awesome-config/0.0.0':
        packageJsonPreventOverwriteFxt.cache,
      '/target/package.json': packageJsonPreventOverwriteFxt.current,
      '/configuration-package/package.json': JSON.stringify({
        name: 'awesome-config',
        version: '1.0.0',
      }),
      '/configuration-package/configs/package.json': JSON.stringify(
        packageJsonPreventOverwriteFxt.upcoming,
      ),
    }

    vol.fromJSON(dir, '/')

    await install({
      configsPath: '/configuration-package',
      targetPath: '/target',
    })

    expect(
      JSON.parse(vol.readFileSync('/target/package.json', 'utf8')),
    ).toEqual(packageJsonPreventOverwriteFxt.result)
  })
})
