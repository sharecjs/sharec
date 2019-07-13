const { vol } = require('memfs')
const {
  clearPackageJson,
  ereaseDependencies,
  ereaseMetaData,
} = require('../remove')

describe('core > package > remove >', () => {
  const packageJson5 = require('fixtures/package/package_05.json')
  const packageJson6 = require('fixtures/package/package_06.json')
  const packageJsonFixture = require('fixtures/package/package_07.json')

  beforeEach(() => {
    vol.reset()
  })

  describe('clearPackageJson', () => {
    it('should remove configs from package json and injection status', async () => {
      const dir = {
        '/target/package.json': JSON.stringify(packageJson5),
        '/configuration-package/package.json': JSON.stringify(packageJson6),
      }

      vol.fromJSON(dir)

      await clearPackageJson('/configuration-package', '/target')

      expect(
        JSON.parse(vol.readFileSync('/target/package.json', 'utf8')),
      ).toMatchSnapshot()
    })
  })

  describe('ereaseDependencies', () => {
    it('should remove all injected configs in package.json from target path', () => {
      const deps = {
        devDependencies: packageJsonFixture.devDependencies,
      }
      const res = ereaseDependencies(deps)(packageJsonFixture)

      expect(res).toEqual([{ ...packageJsonFixture, devDependencies: {} }, {}])
    })

    it('should remove all injected configs except changed by user after injection', () => {
      const deps = {
        devDependencies: packageJsonFixture.devDependencies,
      }
      const modifiedDeps = {
        '@commitlint/cli': '^8.6.1',
        '@commitlint/config-conventional': '^8.6.0',
        'babel-eslint': '^11.0.1',
        commitizen: '^2.1.1',
      }
      const res = ereaseDependencies(deps)({
        ...packageJsonFixture,
        devDependencies: {
          ...packageJsonFixture.devDependencies,
          ...modifiedDeps,
        },
      })

      expect(res).toEqual([
        {
          ...packageJsonFixture,
          devDependencies: modifiedDeps,
        },
        {
          '@commitlint/cli': '^7.6.1 -> ^8.6.1',
          '@commitlint/config-conventional': '^7.6.0 -> ^8.6.0',
          'babel-eslint': '^10.0.1 -> ^11.0.1',
          commitizen: '^3.1.1 -> ^2.1.1',
        },
      ])
    })
  })

  describe('ereaseMetaData', () => {
    it('should remove all sharec meta-data in package.json from target path', () => {
      const res = ereaseMetaData({
        sharec: {
          injected: true,
        },
      })

      expect(res).toEqual({})
    })
  })
})
