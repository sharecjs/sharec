const { fixtures } = require('testUtils')
const { vol } = require('memfs')
const install = require('../../install')

describe('commands > install > base >', () => {
  const packageJsonBaseInstallFxt = fixtures('package/03-base-install', 'json')
  const babelBaseFxt = fixtures('babel/json/01-base', 'json')
  const eslintBaseFxt = fixtures('eslint/json/01-base', 'json')
  const eslintBaseFxtYaml = fixtures('eslint/yaml/01-base')
  const npmignoreBaseFxt = fixtures('npmignore/01-base')
  const gitignoreBaseFxt = fixtures('gitignore/01-base')

  beforeEach(() => {
    vol.reset()
  })

  it('should merge all configs from target path', async () => {
    expect.assertions(8)

    const dir = {
      '/target/.eslintrc': JSON.stringify(eslintBaseFxt.current),
      '/target/.babelrc': JSON.stringify(babelBaseFxt.current),
      '/target/.eslintrc.yaml': eslintBaseFxtYaml.current,
      '/target/package.json': JSON.stringify(
        packageJsonBaseInstallFxt.current,
        null,
        2,
      ),
      '/target/.gitignore': gitignoreBaseFxt.current,
      '/target/.npmignore': npmignoreBaseFxt.current,
      '/configuration-package/package.json': JSON.stringify({
        name: 'awesome-config',
        version: '1.0.0',
      }),
      '/configuration-package/configs/.eslintrc': JSON.stringify(
        eslintBaseFxt.upcoming,
      ),
      '/configuration-package/configs/.eslintrc.yaml':
        eslintBaseFxtYaml.upcoming,
      '/configuration-package/configs/.editorconfig': 'bar',
      '/configuration-package/configs/.babelrc': JSON.stringify(
        babelBaseFxt.upcoming,
      ),
      '/configuration-package/configs/package-lock.json': 'bar',
      '/configuration-package/configs/package.json': JSON.stringify(
        packageJsonBaseInstallFxt.upcoming,
      ),
      '/configuration-package/configs/.gitignore': gitignoreBaseFxt.upcoming,
      '/configuration-package/configs/.npmignore': npmignoreBaseFxt.upcoming,
    }

    vol.fromJSON(dir, '/')

    await install({
      configsPath: '/configuration-package',
      targetPath: '/target',
    })

    expect(
      JSON.parse(vol.readFileSync('/target/package.json', 'utf8')),
    ).toEqual(packageJsonBaseInstallFxt.result)
    expect(vol.readdirSync('/target')).not.toContain('package-lock.json')
    expect(vol.readFileSync('/target/.editorconfig', 'utf8')).toEqual('bar')
    expect(JSON.parse(vol.readFileSync('/target/.babelrc', 'utf8'))).toEqual(
      babelBaseFxt.result,
    )
    expect(JSON.parse(vol.readFileSync('/target/.eslintrc', 'utf8'))).toEqual(
      eslintBaseFxt.result,
    )
    expect(vol.readFileSync('/target/.eslintrc.yaml', 'utf8')).toEqual(
      eslintBaseFxtYaml.result,
    )
    expect(vol.readFileSync('/target/.gitignore', 'utf8')).toEqual(
      gitignoreBaseFxt.result,
    )
    expect(vol.readFileSync('/target/.npmignore', 'utf8')).toEqual(
      npmignoreBaseFxt.result,
    )
  })
})
