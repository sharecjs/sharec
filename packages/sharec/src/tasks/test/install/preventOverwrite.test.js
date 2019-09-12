const { fixtures } = require('testUtils')
const { vol } = require('memfs')
const install = require('../../install')

describe('tasks > install > prevent ovewrite >', () => {
  const packageJsonPreventOverwriteFxt = fixtures(
    'package/json/07-prevent-overwrite',
    'json',
  )
  const commonPreventOverwriteFxt = fixtures(
    'common/json/03-prevent-overwrite',
    'json',
  )
  const commonPreventOverwriteFxtYaml = fixtures(
    'common/yaml/03-prevent-overwrite',
  )

  beforeEach(() => {
    vol.reset()
  })

  it('should install configuration to the target project withot ovewriting of changed fields', async () => {
    expect.assertions(3)

    const dir = {
      '/target/node_modules/.cache/sharec/awesome-config/0.0.0/package.json': JSON.stringify(
        packageJsonPreventOverwriteFxt.cached,
      ),
      '/target/node_modules/.cache/sharec/awesome-config/0.0.0/common.json': JSON.stringify(
        commonPreventOverwriteFxt.cached,
      ),
      '/target/node_modules/.cache/sharec/awesome-config/0.0.0/common.yaml':
        commonPreventOverwriteFxtYaml.cached,
      '/target/common.json': JSON.stringify(commonPreventOverwriteFxt.current),
      '/target/common.yaml': commonPreventOverwriteFxtYaml.current,
      '/target/package.json': JSON.stringify(
        packageJsonPreventOverwriteFxt.current,
      ),
      '/configuration-package/configs/package.json': JSON.stringify(
        packageJsonPreventOverwriteFxt.upcoming,
      ),
      '/configuration-package/configs/common.json': JSON.stringify(
        commonPreventOverwriteFxt.upcoming,
      ),
      '/configuration-package/configs/common.yaml':
        commonPreventOverwriteFxtYaml.upcoming,
    }

    vol.fromJSON(dir, '/')

    await install({
      installedMeta: {
        config: 'awesome-config',
        version: '0.0.0',
      },
      upcomingMeta: {
        config: 'awesome-config',
        version: '1.0.0',
      },
      configsPath: '/configuration-package',
      targetPath: '/target',
    })

    expect(
      JSON.parse(vol.readFileSync('/target/package.json', 'utf8')),
    ).toEqual(packageJsonPreventOverwriteFxt.result)
    expect(JSON.parse(vol.readFileSync('/target/common.json', 'utf8'))).toEqual(
      commonPreventOverwriteFxt.result,
    )
    expect(vol.readFileSync('/target/common.yaml', 'utf8')).toEqual(
      commonPreventOverwriteFxtYaml.result,
    )
  })
})
