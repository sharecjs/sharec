const { fixture } = require('testUtils')
const { vol } = require('memfs')
const install = require('../install')

describe('tasks > install >', () => {
  const packageJson01 = fixture('package/package_01.json', 'json')
  const packageJson02 = fixture('package/package_02.json', 'json')
  const babel01 = fixture('babel/json/babel_01.json', 'json')
  const babel02 = fixture('babel/json/babel_02.json', 'json')
  const eslint01 = fixture('eslint/json/eslintrc_01.json', 'json')
  const eslint02 = fixture('eslint/json/eslintrc_02.json', 'json')
  const yamlEslint01 = fixture('eslint/yaml/eslintrc_01.yml')
  const yamlEslint02 = fixture('eslint/yaml/eslintrc_02.yml')

  beforeEach(() => {
    vol.reset()
  })

  it('should install configuration to the target project', async () => {
    expect.assertions(5)

    const dir = {
      '/target/.eslintrc': JSON.stringify(eslint01),
      '/target/babelrc.js': JSON.stringify(babel01),
      '/target/.eslintrc.yaml': yamlEslint01,
      '/target/package.json': JSON.stringify(packageJson01, null, 2),
      '/configuration-package/configs/.eslintrc': JSON.stringify(eslint02),
      '/configuration-package/configs/.eslintrc.yaml': yamlEslint02,
      '/configuration-package/configs/.editorconfig': 'bar',
      '/configuration-package/configs/babelrc.js': JSON.stringify(babel02),
      '/configuration-package/configs/package.json': JSON.stringify(
        packageJson02,
        null,
        2,
      ),
    }
    vol.fromJSON(dir, '/')

    await install({
      configsPath: '/configuration-package',
      targetPath: '/target',
      configsVersion: '1.0.0',
    })

    expect(vol.readFileSync('/target/.editorconfig', 'utf8')).toMatchSnapshot()
    expect(vol.readFileSync('/target/babelrc.js', 'utf8')).toMatchSnapshot()
    expect(
      JSON.parse(vol.readFileSync('/target/.eslintrc', 'utf8')),
    ).toMatchSnapshot()
    expect(vol.readFileSync('/target/.eslintrc.yaml', 'utf8')).toMatchSnapshot()
    expect(vol.readFileSync('/target/package.json', 'utf8')).toMatchSnapshot()
  })

  it('should throw an error if configuration with the same version already installed', async () => {
    expect.assertions(1)

    const dir = {
      '/target/package.json': JSON.stringify({
        sharec: {
          version: '1.0.0',
        },
      }),
      '/configuration-package/configs/.editorconfig': 'bar',
    }
    vol.fromJSON(dir, '/')

    try {
      await install({
        configsPath: '/configuration-package',
        targetPath: '/target',
        configsVersion: '1.0.0',
      })
    } catch (err) {
      expect(err.message).toBe('Configs already installed!')
    }
  })

  it('should throw an error if configuration package was not found', async () => {
    expect.assertions(1)

    const dir = {
      '/target/package.json': JSON.stringify({}),
    }
    vol.fromJSON(dir, '/')

    try {
      await install({
        configsPath: '/configuration-package',
        targetPath: '/target',
      })
    } catch (err) {
      expect(err.message).toContain('ENOENT')
    }
  })
})
