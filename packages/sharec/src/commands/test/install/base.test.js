const { fixture } = require('testUtils')
const { vol } = require('memfs')
const install = require('../../install')

describe('commands > install > base >', () => {
  const packageJson01 = fixture('package/package_01.json', 'json')
  const packageJson02 = fixture('package/package_02.json', 'json')
  const babel01 = fixture('babel/json/babel_01.json', 'json')
  const babel02 = fixture('babel/json/babel_02.json', 'json')
  const eslint01 = fixture('eslint/json/eslintrc_01.json', 'json')
  const eslint02 = fixture('eslint/json/eslintrc_02.json', 'json')
  const yamlEslint01 = fixture('eslint/yaml/eslintrc_01.yml')
  const yamlEslint02 = fixture('eslint/yaml/eslintrc_02.yml')
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
    expect.assertions(9)

    const dir = {
      '/target/.eslintrc': JSON.stringify(eslint01),
      '/target/babelrc.js': JSON.stringify(babel01),
      '/target/.eslintrc.yaml': yamlEslint01,
      '/target/package.json': JSON.stringify(packageJson01, null, 2),
      '/target/.gitignore': gitignoreCurrent,
      '/target/.npmignore': npmignoreCurrent,
      '/configuration-package/package.json': JSON.stringify({
        version: '1.0.0',
      }),
      '/configuration-package/configs/.eslintrc': JSON.stringify(eslint02),
      '/configuration-package/configs/.eslintrc.yaml': yamlEslint02,
      '/configuration-package/configs/.editorconfig': 'bar',
      '/configuration-package/configs/.foo': JSON.stringify({
        foo: 'bar',
        bar: {
          foo: 'bar',
          bar: ['foo', 'bar'],
        },
      }),
      '/configuration-package/configs/babelrc.js': JSON.stringify(babel02),
      '/configuration-package/configs/package-lock.json': 'bar',
      '/configuration-package/configs/package.json': JSON.stringify(
        packageJson02,
      ),
      '/configuration-package/configs/.gitignore': gitignoreNew,
      '/configuration-package/configs/.npmignore': npmignoreNew,
    }

    vol.fromJSON(dir, '/')

    await install({
      configsPath: '/configuration-package',
      targetPath: '/target',
    })

    expect(vol.readdirSync('/target')).not.toContain('package-lock.json')
    expect(vol.readFileSync('/target/.editorconfig', 'utf8')).toMatchSnapshot()
    expect(vol.readFileSync('/target/babelrc.js', 'utf8')).toMatchSnapshot()
    expect(
      JSON.parse(vol.readFileSync('/target/.eslintrc', 'utf8')),
    ).toMatchSnapshot()
    expect(vol.readFileSync('/target/.eslintrc.yaml', 'utf8')).toMatchSnapshot()
    expect(vol.readFileSync('/target/package.json', 'utf8')).toMatchSnapshot()
    expect(
      JSON.parse(vol.readFileSync('/target/.foo', 'utf8')),
    ).toMatchSnapshot()
    expect(vol.readFileSync('/target/.gitignore', 'utf8')).toEqual(
      gitignoreResult,
    )
    expect(vol.readFileSync('/target/.npmignore', 'utf8')).toEqual(
      npmignoreResult,
    )
  })
})
