const { vol } = require('memfs')
const omit = require('lodash/omit')
const pick = require('lodash/pick')
const {
  processPackageJson,
  injectDependencies,
  injectMetaData,
} = require('../install')

describe('core > package > install >', () => {
  const packageJson01 = require('fixtures/package/package_01.json')
  const packageJson02 = require('fixtures/package/package_02.json')
  const packageJsonFixture = require('fixtures/package/package_07.json')

  beforeEach(() => {
    vol.reset()
  })

  describe('processPackageJson', () => {
    it('should merge exist package.json with upcoming from configs', async () => {
      expect.assertions(1)

      const dir = {
        '/target/package.json': JSON.stringify(packageJson01, null, 2),
        '/configs/package.json': JSON.stringify(packageJson02, null, 2),
      }
      vol.fromJSON(dir, '/')

      await processPackageJson('/configs', '/target')

      expect(
        JSON.parse(vol.readFileSync('/target/package.json', 'utf8')),
      ).toMatchSnapshot()
    })
  })

  describe('injectDependencies', () => {
    it('should inject dependencies of different types', () => {
      const deps = pick(packageJsonFixture, ['devDependencies'])
      const res = injectDependencies(deps)(
        omit(packageJsonFixture, ['devDependencies']),
      )

      expect(res).toEqual(packageJsonFixture)
    })

    it('should merge exist dependencies with given by different types', () => {
      const res = injectDependencies({
        devDependencies: {
          husky: '^2.2.0',
          'lint-staged': '^8.1.6',
          prettier: '^1.17.1',
        },
      })({
        ...packageJsonFixture,
        devDependencies: {
          '@commitlint/cli': '^7.6.1',
          '@commitlint/config-conventional': '^7.6.0',
          'babel-eslint': '^10.0.1',
          commitizen: '^3.1.1',
        },
      })

      expect(res).toEqual({
        ...packageJsonFixture,
        devDependencies: {
          husky: '^2.2.0',
          'lint-staged': '^8.1.6',
          prettier: '^1.17.1',
          '@commitlint/cli': '^7.6.1',
          '@commitlint/config-conventional': '^7.6.0',
          'babel-eslint': '^10.0.1',
          commitizen: '^3.1.1',
        },
      })
    })
  })

  describe('injectMetaData', () => {
    it('should inject sharec meta-data', () => {
      const metaData = {
        injected: true,
      }
      const res = injectMetaData(metaData)(packageJsonFixture)

      expect(res).toEqual({
        ...packageJsonFixture,
        sharec: metaData,
      })
    })
  })
})
