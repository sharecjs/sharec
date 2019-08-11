const { fixture } = require('testUtils')
const { vol } = require('memfs')
const install = require('../../install')

describe('commands > install > base >', () => {
  const packageJsonCurrent = fixture(
    'package/03-base-install/current.json',
    'json',
  )
  const packageJsonNew = fixture('package/03-base-install/new.json', 'json')
  const packageJsonResult = fixture(
    'package/03-base-install/result.json',
    'json',
  )

  const babelCurrent = fixture('babel/json/01-base/current.json', 'json')
  const babelNew = fixture('babel/json/01-base/new.json', 'json')
  const babelResult = fixture('babel/json/01-base/result.json', 'json')
  const eslintCurrent = fixture('eslint/json/01-base/current.json', 'json')
  const eslintNew = fixture('eslint/json/01-base/new.json', 'json')
  const eslintResult = fixture('eslint/json/01-base/result.json', 'json')
  const yamlEslintCurrent = fixture('eslint/yaml/01-base/current.yml')
  const yamlEslintNew = fixture('eslint/yaml/01-base/new.yml')
  const yamlEslintResult = fixture('eslint/yaml/01-base/result.yml')
  const npmignoreCurrent = fixture('npmignore/01-base/current.txt')
  const npmignoreNew = fixture('npmignore/01-base/new.txt')
  const npmignoreResult = fixture('npmignore/01-base/result.txt')
  const gitignoreCurrent = fixture('gitignore/01-base/current.txt')
  const gitignoreNew = fixture('gitignore/01-base/new.txt')
  const gitignoreResult = fixture('gitignore/01-base/result.txt')

  beforeEach(() => {
    vol.reset()
  })

  it('should merge all configs from target path', async () => {
    expect.assertions(8)

    const dir = {
      '/target/.eslintrc': JSON.stringify(eslintCurrent),
      '/target/.babelrc': JSON.stringify(babelCurrent),
      '/target/.eslintrc.yaml': yamlEslintCurrent,
      '/target/package.json': JSON.stringify(packageJsonCurrent, null, 2),
      '/target/.gitignore': gitignoreCurrent,
      '/target/.npmignore': npmignoreCurrent,
      '/configuration-package/package.json': JSON.stringify({
        version: '1.0.0',
      }),
      '/configuration-package/configs/.eslintrc': JSON.stringify(eslintNew),
      '/configuration-package/configs/.eslintrc.yaml': yamlEslintNew,
      '/configuration-package/configs/.editorconfig': 'bar',
      '/configuration-package/configs/.babelrc': JSON.stringify(babelNew),
      '/configuration-package/configs/package-lock.json': 'bar',
      '/configuration-package/configs/package.json': JSON.stringify(
        packageJsonNew,
      ),
      '/configuration-package/configs/.gitignore': gitignoreNew,
      '/configuration-package/configs/.npmignore': npmignoreNew,
    }

    vol.fromJSON(dir, '/')

    await install({
      configsPath: '/configuration-package',
      targetPath: '/target',
    })

    expect(
      JSON.parse(vol.readFileSync('/target/package.json', 'utf8')),
    ).toEqual(packageJsonResult)
    expect(vol.readdirSync('/target')).not.toContain('package-lock.json')
    expect(vol.readFileSync('/target/.editorconfig', 'utf8')).toEqual('bar')
    expect(JSON.parse(vol.readFileSync('/target/.babelrc', 'utf8'))).toEqual(
      babelResult,
    )
    expect(JSON.parse(vol.readFileSync('/target/.eslintrc', 'utf8'))).toEqual(
      eslintResult,
    )
    expect(vol.readFileSync('/target/.eslintrc.yaml', 'utf8')).toEqual(
      yamlEslintResult,
    )
    expect(vol.readFileSync('/target/.gitignore', 'utf8')).toEqual(
      gitignoreResult,
    )
    expect(vol.readFileSync('/target/.npmignore', 'utf8')).toEqual(
      npmignoreResult,
    )
  })
})
