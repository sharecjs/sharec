const { fixture } = require('testUtils')
const { vol } = require('memfs')
const remove = require('../remove')

describe('tasks > remove >', () => {
  const packageJson5 = fixture('package/package_05.json', 'json')
  const packageJson6 = fixture('package/package_06.json', 'json')
  const babel10 = fixture('babel/json/babel_10.json', 'json')
  const babel11 = fixture('babel/json/babel_11.json', 'json')
  const eslint04 = fixture('eslint/json/eslintrc_04.json', 'json')
  const eslint05 = fixture('eslint/json/eslintrc_05.json', 'json')
  const yamlEslint04 = fixture('eslint/yaml/eslintrc_04.yml')
  const yamlEslint05 = fixture('eslint/yaml/eslintrc_05.yml')

  beforeEach(() => {
    vol.reset()
  })

  it('should remove configuration from the target project and delete all empty', async () => {
    expect.assertions(3)

    const packageJson = {
      sharec: {
        injected: true,
      },
    }
    const dir = {
      '/target/package.json': JSON.stringify(packageJson),
      '/target/.eslintrc': JSON.stringify(eslint04),
      '/target/.babelrc': JSON.stringify(babel10),
      '/configuration-package/configs/.eslintrc': JSON.stringify(eslint05),
      '/configuration-package/configs/.babelrc': JSON.stringify(babel11),
    }
    vol.fromJSON(dir)

    await remove({
      targetPath: '/target',
      configsPath: '/configuration-package',
    })

    expect(
      JSON.parse(vol.readFileSync('/target/package.json')),
    ).toMatchSnapshot()
    expect(
      JSON.parse(vol.readFileSync('/target/.eslintrc', 'utf8')),
    ).toMatchSnapshot()
    expect(JSON.parse(vol.readFileSync('/target/.babelrc'))).toMatchSnapshot()
  })

  it('should remove configuration from package.json in the target project', async () => {
    expect.assertions(1)

    const dir = {
      '/target/package.json': JSON.stringify(packageJson5),
      '/configuration-package/configs/package.json': JSON.stringify(
        packageJson6,
      ),
    }
    vol.fromJSON(dir)

    await remove({
      targetPath: '/target',
      configsPath: '/configuration-package',
    })

    expect(
      JSON.parse(vol.readFileSync('/target/package.json')),
    ).toMatchSnapshot()
  })

  it('should remove configuration from all files in the target project', async () => {
    expect.assertions(3)

    const dir = {
      '/target/package.json': JSON.stringify(packageJson5),
      '/target/.eslintrc.yml': yamlEslint04,
      '/target/.babelrc': JSON.stringify(babel10),
      '/configuration-package/configs/package.json': JSON.stringify(
        packageJson6,
      ),
      '/configuration-package/configs/.eslintrc.yml': yamlEslint05,
      '/configuration-package/configs/.babelrc': JSON.stringify(babel11),
    }
    vol.fromJSON(dir)

    await remove({
      targetPath: '/target',
      configsPath: '/configuration-package',
    })

    expect(vol.readFileSync('/target/.eslintrc.yml', 'utf8')).toMatchSnapshot()
    expect(JSON.parse(vol.readFileSync('/target/.babelrc'))).toMatchSnapshot()
    expect(
      JSON.parse(vol.readFileSync('/target/package.json')),
    ).toMatchSnapshot()
  })

  it('should throw an error if configuration package was not found', async () => {
    expect.assertions(1)

    const dir = {
      '/target/package.json': JSON.stringify(
        {
          sharec: {
            injected: true,
          },
        },
        null,
        2,
      ),
    }
    vol.fromJSON(dir, '/')

    try {
      await remove({
        targetPath: '/target',
        configsPath: '/configuration-package',
      })
    } catch (err) {
      expect(err.message).toContain('ENOENT')
    }
  })
})
