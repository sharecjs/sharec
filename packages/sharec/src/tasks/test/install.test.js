const path = require('path')
const { readFileSync } = require.requireActual('fs')
const { vol } = require('memfs')
const install = require('../install')

describe('tasks > install >', () => {
  const packageJson01 = require('fixtures/package/package_01.json')
  const packageJson02 = require('fixtures/package/package_02.json')
  const babel01 = require('fixtures/babel/json/babel_01.json')
  const babel02 = require('fixtures/babel/json/babel_02.json')
  const eslint01 = require('fixtures/eslint/json/eslintrc_01.json')
  const eslint02 = require('fixtures/eslint/json/eslintrc_02.json')
  const yamlEslint01 = readFileSync(
    path.resolve(
      __dirname,
      '../../../test/fixtures/eslint/yaml/eslintrc_01.yml',
    ),
    'utf8',
  )
  const yamlEslint02 = readFileSync(
    path.resolve(
      __dirname,
      '../../../test/fixtures/eslint/yaml/eslintrc_02.yml',
    ),
    'utf8',
  )

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
    })

    expect(vol.readFileSync('/target/.editorconfig', 'utf8')).toMatchSnapshot()
    expect(vol.readFileSync('/target/babelrc.js', 'utf8')).toMatchSnapshot()
    expect(
      JSON.parse(vol.readFileSync('/target/.eslintrc', 'utf8')),
    ).toMatchSnapshot()
    expect(vol.readFileSync('/target/.eslintrc.yaml', 'utf8')).toMatchSnapshot()
    expect(vol.readFileSync('/target/package.json', 'utf8')).toMatchSnapshot()
  })

  it('should throw an error if configuration already installed', async () => {
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
      '/configuration-package/configs/.editorconfig': 'bar',
    }
    vol.fromJSON(dir, '/')

    try {
      await install({
        configsPath: '/configuration-package',
        targetPath: '/target',
      })
    } catch (err) {
      expect(err.message).toBe('Configs already installed!')
    }
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
      await install({
        configsPath: '/configuration-package',
        targetPath: '/target',
      })
    } catch (err) {
      expect(err.message).toContain('ENOENT')
    }
  })
})
