const { fixture } = require('testUtils')
const { vol } = require('memfs')
const install = require('../../install')

describe('commands > install > installed > ', () => {
  const packageJsonResult = fixture(
    'package/json/03-base-install/result.json',
    'json',
  )

  beforeEach(() => {
    vol.reset()
  })

  it('should not do anything if configs versions are equal already injected', async () => {
    expect.assertions(1)

    const packageJson = {
      sharec: {
        version: '1.0.0',
      },
    }
    const dir = {
      '/target/package.json': JSON.stringify(packageJson, null, 2),
      '/configuration-package/package.json': JSON.stringify({
        name: 'awesome-config',
        version: '1.0.0',
      }),
      '/configuration-package/configs/package.json': JSON.stringify(
        packageJsonResult,
      ),
    }

    vol.fromJSON(dir, '/')

    await install({
      configsPath: '/configuration-package',
      targetPath: '/target',
    })

    expect(
      JSON.parse(vol.readFileSync('/target/package.json', 'utf8')),
    ).toEqual(packageJson)
  })
})
