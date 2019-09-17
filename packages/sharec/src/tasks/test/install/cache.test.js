const path = require('path')
const { vol } = require('memfs')
const { fixtures } = require('testUtils')
const install = require('../../install')

describe('tasks > install > cache >', () => {
  const packageInstallJsonBaseFxt = fixtures('package/json/03-base-install')
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
      '/configuration-package/configs/.eslintrc': eslintBaseFxt.upcoming,
      '/configuration-package/configs/.eslintrc.yaml':
        eslintBaseFxtYaml.upcoming,
      '/configuration-package/configs/.editorconfig': 'bar',
      '/configuration-package/configs/babelrc.json': babelBaseFxt.upcoming,
      '/configuration-package/configs/package.json':
        packageInstallJsonBaseFxt.upcoming,
    }
    const cacheDir = '/target/node_modules/.cache/sharec/awesome-config/1.0.0'

    vol.fromJSON(dir, '/')

    await install({
      upcomingMeta: {
        config: 'awesome-config',
        version: '1.0.0',
      },
      configsPath: '/configuration-package',
      targetPath: '/target',
    })

    expect(vol.readdirSync(cacheDir)).toEqual(
      expect.arrayContaining([
        '.editorconfig',
        '.eslintrc',
        '.eslintrc.yaml',
        'babelrc.json',
        'package.json',
      ]),
    )
    expect(
      vol.readFileSync(path.join(cacheDir, '.editorconfig'), 'utf8'),
    ).toEqual('bar')
    expect(vol.readFileSync(path.join(cacheDir, '.eslintrc'), 'utf8')).toEqual(
      eslintBaseFxt.upcoming,
    )
    expect(
      vol.readFileSync(path.join(cacheDir, '.eslintrc.yaml'), 'utf8'),
    ).toEqual(eslintBaseFxtYaml.upcoming)
    expect(
      vol.readFileSync(path.join(cacheDir, 'babelrc.json'), 'utf8'),
    ).toEqual(babelBaseFxt.upcoming)
    expect(
      vol.readFileSync(path.join(cacheDir, 'package.json'), 'utf8'),
    ).toEqual(packageInstallJsonBaseFxt.upcoming)
  })
})
