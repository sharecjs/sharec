const path = require('path')
const { readFileSync } = require.requireActual('fs')
const { vol } = require('memfs')
const sharec = require('../sharec')

describe('sharec base', () => {
  const packageJson01 = require('fixtures/package/package_01.json')
  const packageJson02 = require('fixtures/package/package_02.json')
  const eslint01 = require('fixtures/eslint/json/eslintrc_01.json')
  const eslint02 = require('fixtures/eslint/json/eslintrc_02.json')
  const yamlEslint01 = readFileSync(
    path.resolve(__dirname, '../../test/fixtures/eslint/yaml/eslintrc_01.yml'),
    'utf8',
  )
  const yamlEslint02 = readFileSync(
    path.resolve(__dirname, '../../test/fixtures/eslint/yaml/eslintrc_02.yml'),
    'utf8',
  )

  describe('configuration processing', () => {
    it('should not do anything if target path equals to configs path', async () => {
      const packageJson = {}
      const dir = {
        '/target/package.json': JSON.stringify(packageJson),
      }
      vol.fromJSON(dir, '/')

      await sharec('/target', '/target')

      expect(
        JSON.parse(vol.readFileSync('/target/package.json', 'utf8')),
      ).toEqual(packageJson)
    })

    it('should not do anything if config already injected', async () => {
      const packageJson = {
        sharec: {
          injected: true,
        },
      }
      const dir = {
        '/target/package.json': JSON.stringify(packageJson, null, 2),
        '/configuration-package/configs/package.json': JSON.stringify(
          packageJson01,
          null,
          2,
        ),
      }
      vol.fromJSON(dir, '/')

      await sharec('/target', '/configuration-package')

      expect(
        JSON.parse(vol.readFileSync('/target/package.json', 'utf8')),
      ).toEqual(packageJson)
    })

    it('should merge all configs from target path', async () => {
      const dir = {
        '/target/.eslintrc': JSON.stringify(eslint01),
        '/target/babelrc.js': 'foo',
        '/target/.eslintrc.yaml': yamlEslint01,
        '/target/package.json': JSON.stringify(packageJson01, null, 2),
        '/configuration-package/configs/.eslintrc': JSON.stringify(eslint02),
        '/configuration-package/configs/.eslintrc.yaml': yamlEslint02,
        '/configuration-package/configs/.editorconfig': 'bar',
        '/configuration-package/configs/babelrc.js': 'baz',
        '/configuration-package/configs/package.json': JSON.stringify(
          packageJson02,
          null,
          2,
        ),
      }
      vol.fromJSON(dir, '/')

      await sharec('/target', '/configuration-package')

      expect(
        vol.readFileSync('/target/.editorconfig', 'utf8'),
      ).toMatchSnapshot()
      expect(vol.readFileSync('/target/babelrc.js', 'utf8')).toMatchSnapshot()
      expect(
        JSON.parse(vol.readFileSync('/target/.eslintrc', 'utf8')),
      ).toMatchSnapshot()
      expect(
        vol.readFileSync('/target/.eslintrc.yaml', 'utf8'),
      ).toMatchSnapshot()
      expect(vol.readFileSync('/target/package.json', 'utf8')).toMatchSnapshot()
    })
  })

  describe('errors handling', () => {
    it('should print error if configs dir is not exists in configuration package', () => {
      const dir = {
        '/target/package.json': JSON.stringify({}),
        '/target/.editorconfig': 'foo',
        '/configuration-package/.editorconfig': 'bar',
      }
      vol.fromJSON(dir, '/')

      expect(sharec('/target', '/configuration-package')).rejects.toEqual(
        'sharec: configs directory is not exists in your configuration package!',
      )
    })
  })
})
