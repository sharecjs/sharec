const { fixtures } = require('testUtils')
const { vol } = require('memfs')
const install = require('../../install')

describe('tasks > install > base >', () => {
  const packageInstallJsonBaseFxt = fixtures('package/03-base-install', 'json')
  const babelBaseFxt = fixtures('babel/json/01-base', 'json')
  const eslintBaseFxt = fixtures('eslint/json/01-base', 'json')
  const eslintBaseFxtYaml = fixtures('eslint/yaml/01-base')

  beforeEach(() => {
    vol.reset()
  })

  it('should install configuration to the target project', async () => {
    expect.assertions(5)

    const dir = {
      '/target/.eslintrc': JSON.stringify(eslintBaseFxt.current),
      '/target/babelrc.json': JSON.stringify(babelBaseFxt.current),
      '/target/.eslintrc.yaml': eslintBaseFxtYaml.current,
      '/target/package.json': JSON.stringify(packageInstallJsonBaseFxt.current),
      '/configuration-package/configs/.eslintrc': JSON.stringify(
        eslintBaseFxt.new,
      ),
      '/configuration-package/configs/.eslintrc.yaml': eslintBaseFxtYaml.new,
      '/configuration-package/configs/.editorconfig': 'bar',
      '/configuration-package/configs/babelrc.json': JSON.stringify(
        babelBaseFxt.new,
      ),
      '/configuration-package/configs/package.json': JSON.stringify(
        packageInstallJsonBaseFxt.new,
      ),
    }

    vol.fromJSON(dir, '/')

    await install({
      configsPath: '/configuration-package',
      targetPath: '/target',
      configsVersion: '1.0.0',
      configsName: 'awesome-config',
    })

    expect(vol.readFileSync('/target/.editorconfig', 'utf8')).toEqual('bar')
    expect(
      JSON.parse(vol.readFileSync('/target/babelrc.json', 'utf8')),
    ).toEqual(babelBaseFxt.result)
    expect(JSON.parse(vol.readFileSync('/target/.eslintrc', 'utf8'))).toEqual(
      eslintBaseFxt.result,
    )
    expect(vol.readFileSync('/target/.eslintrc.yaml', 'utf8')).toEqual(
      eslintBaseFxtYaml.result,
    )
    expect(
      JSON.parse(vol.readFileSync('/target/package.json', 'utf8')),
    ).toEqual(packageInstallJsonBaseFxt.result)
  })
})
