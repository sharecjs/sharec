const omit = require('lodash/omit')
const pick = require('lodash/pick')
const {
  extractDependencies,
  extractConfigs,
  extractMetaData,
  injectDependencies,
  injectMetaData,
  ereaseDependencies,
  ereaseMetaData,
} = require('../package')

const packageJsonFixture = {
  scripts: {
    commit: '',
    lint: "eslint 'src/**/*.{js,jsx,json}'",
    'lint-staged': 'lint-staged',
  },
  'lint-staged': {
    'src/**/*.{js,jsx,json}': ['eslint --fix', 'prettier --write', 'git add'],
  },
  husky: {
    hooks: {
      'pre-commit': 'lint-staged',
      'commit-msg': 'commitlint -E HUSKY_GIT_PARAMS',
    },
  },
  config: {
    commitizen: {
      path: 'cz-conventional-changelog',
    },
  },
  prettier: {
    semi: false,
    singleQuote: true,
    trailingComma: 'all',
  },
  sharec: {
    injected: true,
  },
  eslintConfig: {
    parser: 'babel-eslint',
    extends: ['standard', 'prettier', 'prettier/standard'],
    plugins: ['prettier'],
    env: {
      jest: true,
      node: true,
    },
    rules: {
      'prettier/prettier': [
        'error',
        {
          semi: false,
          singleQuote: true,
          trailingComma: 'all',
        },
      ],
    },
  },
  eslintIgnore: ['/node_modules'],
  devDependencies: {
    '@commitlint/cli': '^7.6.1',
    '@commitlint/config-conventional': '^7.6.0',
    'babel-eslint': '^10.0.1',
    commitizen: '^3.1.1',
    'cz-conventional-changelog': '^2.1.0',
    eslint: '^5.16.0',
    'eslint-config-prettier': '^4.2.0',
    'eslint-config-prettier-standard': '^2.0.0',
    'eslint-config-standard': '^12.0.0',
    'eslint-plugin-import': '^2.17.2',
    'eslint-plugin-node': '^9.0.1',
    'eslint-plugin-prettier': '^3.1.0',
    'eslint-plugin-promise': '^4.1.1',
    'eslint-plugin-standard': '^4.0.0',
    husky: '^2.2.0',
    'lint-staged': '^8.1.6',
    prettier: '^1.17.1',
  },
}

describe('core > package', () => {
  describe('extractDependencies', () => {
    it('should extract dependencies from given package.json', () => {
      const extractedDeps = extractDependencies(packageJsonFixture)

      expect(extractedDeps).toEqual(
        pick(packageJsonFixture, ['devDependencies']),
      )
    })

    it('should return empty object if dependencies is empty', () => {
      const extractedDeps = extractDependencies({})

      expect(extractedDeps).toEqual({})
    })
  })

  describe('extractConfigs', () => {
    it('should return all configs from package.json except dependencies, sharec meta-data and other standard package fields', () => {
      const extractedConfigs = extractConfigs(packageJsonFixture)

      expect(extractedConfigs).toEqual(
        pick(packageJsonFixture, [
          'scripts',
          'lint-staged',
          'husky',
          'config',
          'prettier',
          'eslintConfig',
          'eslintIgnore',
        ]),
      )
    })
  })

  describe('extractMetaData', () => {
    it('should return sharec meta-data', () => {
      const extractedMetaData = extractMetaData(packageJsonFixture)

      expect(extractedMetaData).toEqual(packageJsonFixture.sharec)
    })

    it('should return null if sharec meta-data is not exists', () => {
      const extractedMetaData = extractMetaData({})

      expect(extractedMetaData).toBeNull()
    })
  })

  // TODO: need strategies
  // describe('injectConfigs', () => {})

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

  // TODO: need strategies
  // describe('ereaseConfigs', () => {
  //   it('should remove given configs from package.json file', () => {
  //     expect(1 + 1).toBe(2)
  //   })
  // })

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
