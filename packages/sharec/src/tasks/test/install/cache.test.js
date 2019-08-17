const path = require('path')
const { vol } = require('memfs')
const { fixtures } = require('testUtils')
const install = require('../../install')

describe('tasks > install > base >', () => {
  const packageInstallJsonBaseFxt = fixtures('package/03-base-install')
  const babelBaseFxt = fixtures('babel/json/01-base')
  const eslintBaseFxt = fixtures('eslint/json/01-base')
  const eslintBaseFxtYaml = fixtures('eslint/yaml/01-base')

  beforeEach(() => {
    vol.reset()
  })

  it('should cache all incoming configuration in the target project node_modules/.cache', async () => {
    expect.assertions(6)

    const dir = {
      '/target/.eslintrc': eslintBaseFxt.current,
      '/target/babelrc.json': babelBaseFxt.current,
      '/target/.eslintrc.yaml': eslintBaseFxtYaml.current,
      '/target/package.json': packageInstallJsonBaseFxt.current,
      '/configuration-package/configs/.eslintrc': eslintBaseFxt.new,
      '/configuration-package/configs/.eslintrc.yaml': eslintBaseFxtYaml.new,
      '/configuration-package/configs/.editorconfig': 'bar',
      '/configuration-package/configs/babelrc.json': babelBaseFxt.new,
      '/configuration-package/configs/package.json':
        packageInstallJsonBaseFxt.new,
    }
    const cacheDir = '/target/node_modules/.cache/sharec/awesome-config/1.0.0'

    vol.fromJSON(dir, '/')

    await install({
      configsPath: '/configuration-package',
      configsVersion: '1.0.0',
      configsName: 'awesome-config',
      targetPath: '/target',
    })

    expect(vol.readdirSync(cacheDir)).toEqual([
      '.editorconfig',
      '.eslintrc',
      '.eslintrc.yaml',
      'babelrc.json',
      'package.json',
    ])
    expect(
      vol.readFileSync(path.join(cacheDir, '.editorconfig'), 'utf8'),
    ).toEqual('bar')
    expect(vol.readFileSync(path.join(cacheDir, '.eslintrc'), 'utf8')).toEqual(
      eslintBaseFxt.new,
    )
    expect(
      vol.readFileSync(path.join(cacheDir, '.eslintrc.yaml'), 'utf8'),
    ).toEqual(eslintBaseFxtYaml.new)
    expect(
      vol.readFileSync(path.join(cacheDir, 'babelrc.json'), 'utf8'),
    ).toEqual(babelBaseFxt.new)
    expect(
      vol.readFileSync(path.join(cacheDir, 'package.json'), 'utf8'),
    ).toEqual(packageInstallJsonBaseFxt.new)
  })
})
