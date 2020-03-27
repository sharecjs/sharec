const { fixtures } = require('testUtils')
const { vol } = require('memfs')
const install = require('../../install')

describe('commands > install > overwrite mode >', () => {
  const packageJsonOverwriteModeFxt = fixtures(
    'package/json/09-overwrite-mode',
    'json',
  )
  const commonOverwriteModeFxt = fixtures(
    'common/json/04-overwrite-mode',
    'json',
  )
  const commonOverwriteModeFxtYaml = fixtures('common/yaml/04-overwrite-mode')
  const commonOverwriteModeFxtLines = fixtures('common/lines/00-overwrite-mode')

  beforeEach(() => {
    vol.reset()
  })

  it('should remplace all configs from target path with upcoming', async () => {
    expect.assertions(4)

    const dir = {
      '/target/package.json': JSON.stringify(
        packageJsonOverwriteModeFxt.current,
      ),
      '/target/config.json': JSON.stringify(commonOverwriteModeFxt.current),
      '/target/config.yaml': JSON.stringify(commonOverwriteModeFxtYaml.current),
      '/target/config.txt': JSON.stringify(commonOverwriteModeFxtLines.current),
      '/configuration-package/package.json': JSON.stringify({
        name: 'awesome-config',
        version: '1.0.0',
      }),
      '/configuration-package/configs/package.json': JSON.stringify(
        packageJsonOverwriteModeFxt.upcoming,
      ),
      '/configuration-package/configs/config.json': JSON.stringify(
        commonOverwriteModeFxt.upcoming,
      ),
      '/configuration-package/configs/config.yaml':
        commonOverwriteModeFxtYaml.upcoming,
      '/configuration-package/configs/config.txt':
        commonOverwriteModeFxtLines.upcoming,
    }

    vol.fromJSON(dir, '/')

    await install({
      configsPath: '/configuration-package',
      targetPath: '/target',
      options: {
        overwrite: true,
      },
    })

    expect(
      JSON.parse(vol.readFileSync('/target/package.json', 'utf8')),
    ).toEqual(packageJsonOverwriteModeFxt.result)
    expect(JSON.parse(vol.readFileSync('/target/config.json', 'utf8'))).toEqual(
      commonOverwriteModeFxt.upcoming,
    )
    expect(vol.readFileSync('/target/config.yaml', 'utf8')).toEqual(
      commonOverwriteModeFxtYaml.upcoming,
    )
    expect(vol.readFileSync('/target/config.txt', 'utf8')).toEqual(
      commonOverwriteModeFxtLines.upcoming,
    )
  })
})
