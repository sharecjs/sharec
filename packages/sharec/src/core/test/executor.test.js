const path = require('path')
const { readFileSync } = require.requireActual('fs')
const { vol } = require('memfs')
const { executeInjection } = require('core/executor')

describe('core > executor >', () => {
  const packageJson01 = require('fixtures/package/package_01.json')
  const packageJson02 = require('fixtures/package/package_02.json')
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

  describe('executeInjection', () => {
    beforeEach(() => {
      vol.reset()
    })

    it('should collect and apply all configs to target project (without package.json)', async () => {
      expect.assertions(5)

      const dir = {
        '/target/package.json': JSON.stringify({}),
        '/target/.eslintrc': JSON.stringify(eslint01),
        '/target/babelrc.js': 'foo',
        '/target/.eslintrc.yaml': yamlEslint01,
        '/configs/.eslintrc': JSON.stringify(eslint02),
        '/configs/.eslintrc.yaml': yamlEslint02,
        '/configs/.editorconfig': 'bar',
        '/configs/babelrc.js': 'baz',
      }
      vol.fromJSON(dir, '/')

      await executeInjection('/configs', '/target', [
        '.eslintrc',
        '.eslintrc.yaml',
        '.editorconfig',
        'babelrc.js',
      ])

      expect(vol.readFileSync('/target/package.json', 'utf8')).toMatchSnapshot()
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
    })

    it('should collect and apply all configs to target project (only package.json)', async () => {
      expect.assertions(1)

      const dir = {
        '/target/package.json': JSON.stringify(packageJson01, null, 2),
        '/configs/package.json': JSON.stringify(packageJson02, null, 2),
      }
      vol.fromJSON(dir, '/')

      await executeInjection('/configs', '/target', ['package.json'])

      expect(vol.readFileSync('/target/package.json', 'utf8')).toMatchSnapshot()
    })

    it('should collect and apply all configs to target project (with package.json)', async () => {
      expect.assertions(5)

      const dir = {
        '/target/.eslintrc': JSON.stringify(eslint01),
        '/target/babelrc.js': 'foo',
        '/target/.eslintrc.yaml': yamlEslint01,
        '/target/package.json': JSON.stringify(packageJson01, null, 2),
        '/configs/.eslintrc': JSON.stringify(eslint02),
        '/configs/.eslintrc.yaml': yamlEslint02,
        '/configs/.editorconfig': 'bar',
        '/configs/babelrc.js': 'baz',
        '/configs/package.json': JSON.stringify(packageJson02, null, 2),
      }
      vol.fromJSON(dir, '/')

      await executeInjection('/configs', '/target', [
        '.eslintrc',
        '.eslintrc.yaml',
        '.editorconfig',
        'babelrc.js',
        'package.json',
      ])

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
})
