const mockFs = require('mock-fs')
const utils = require('utils')

utils.exec = jest.fn()

const {
  filterConfigs,
  setAsInjected,
  getInjectStatus,
  getConfigs,
  copyConfigs,
  getDependenciesFromConfigs,
  installConfigsDependencies,
  extractPackageJsonConfigs,
  mergePackageJsonConfigs,
  updatePackageJson,
} = require('lib')

afterEach(() => {
  mockFs.restore()
})

describe('filterConfigs', () => {
  it('should remove from configs list non-actual files', () => {
    const configs = ['.prettierrc', 'package.json', 'package-lock.json']

    expect(filterConfigs(configs)).toEqual(['.prettierrc'])
  })
})

describe('getConfigs', () => {
  it('should throw an error if configs dir is not exists', async done => {
    mockFs({})

    try {
      await getConfigs(process.cwd())
    } catch (err) {
      done()
    }
  })

  it('should returns all configs paths from configs dir', async () => {
    mockFs({
      configs: {
        '.eslintrc': 'foo',
        '.prettierrc': 'bar',
        'yarn.lock': '',
        'package-lock.json': '',
        'package.json': '{}',
      },
    })

    const configs = await getConfigs(process.cwd())

    expect(configs).toEqual(['.eslintrc', '.prettierrc', 'package.json'])
  })
})

describe('copyConfigs', () => {
  it('should copy configs to target dir', async () => {
    mockFs({
      configs: {
        '.prettierrc': '',
        '.eslintrc': '',
        'package.json': '',
        'package-lock.json': '',
        'yarn.lock': '',
      },
      workDir: {},
    })

    const rawConfigs = ['.prettierrc', '.eslintrc', 'package.json']

    await copyConfigs('.', './workDir', rawConfigs)

    const res = await utils.readDir('./workDir')

    expect(res).toEqual(['.eslintrc', '.prettierrc'])
  })
})

describe('getDependenciesFromConfigs', () => {
  it('should extract dependencies if package.json exists in configs list', async () => {
    mockFs({
      'configs/package.json': JSON.stringify({
        dependencies: {
          foo: '^1.0.0',
        },
        devDependencies: {
          bar: '^1.0.0',
        },
      }),
    })

    const configs = ['package.json']
    const res = await getDependenciesFromConfigs(process.cwd(), configs)

    expect(res).toEqual({
      dependencies: {
        foo: '^1.0.0',
      },
      devDependencies: {
        bar: '^1.0.0',
      },
    })
  })

  it('should return empty object if package.json not exists in configs list', async () => {
    mockFs({})

    const res = await getDependenciesFromConfigs(process.cwd(), [])

    expect(res).toEqual({})
  })
})

describe('installConfigsDependencies', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should install given dependencies with passed package manager', async () => {
    await installConfigsDependencies('.', {
      dependencies: {
        foo: '^1.0.0',
      },
      devDependencies: {
        bar: '^1.0.0',
      },
    })

    expect(utils.exec).toBeCalledTimes(2)
    expect(utils.exec).toHaveBeenNthCalledWith(
      1,
      'npm install --save foo@^1.0.0',
      { cwd: '.' },
    )
    expect(utils.exec).toHaveBeenNthCalledWith(
      2,
      'npm install --save-dev bar@^1.0.0',
      { cwd: '.' },
    )
  })

  it('should install dependencies with yarn if it passed as package manager', async () => {
    await installConfigsDependencies(
      '.',
      {
        dependencies: {
          foo: '^1.0.0',
        },
        devDependencies: {
          bar: '^1.0.0',
        },
      },
      'yarn',
    )

    expect(utils.exec).toBeCalledTimes(2)
    expect(utils.exec).toHaveBeenNthCalledWith(1, 'yarn add foo@^1.0.0', {
      cwd: '.',
    })
    expect(utils.exec).toHaveBeenNthCalledWith(2, 'yarn add -D bar@^1.0.0', {
      cwd: '.',
    })
  })

  it('should throw an error if passed package manager not equals to yarn or npm', async done => {
    try {
      await installConfigsDependencies('.', {}, 'pnpm')
    } catch (err) {
      done()
    }
  })

  it('should not do anything if dependencies are empty', async () => {
    await installConfigsDependencies({})

    expect(utils.exec).not.toBeCalled()
  })
})

// TODO: implement that
// describe('updatePackageJson', () => {
//   it('should update current package.json file with given configs', async () => {})
//
//   it('should not do anything if package.json is not exists', async () => {})
// })

describe('extractPackageJsonConfigs', () => {
  it('should extract all configs (non-basic fields, instead scripts) from package.json', async () => {
    const packageJson = {
      name: 'foo',
      version: '0.0.1',
      license: 'bar',
      scripts: {
        start: 'baz',
      },
      'lint-staged': {
        'js/**/*': ['prettier --write', 'git add'],
      },
    }

    mockFs({
      'configs/package.json': JSON.stringify(packageJson),
    })

    const configs = await extractPackageJsonConfigs(process.cwd(), [
      'package.json',
    ])

    expect(configs).toEqual({
      scripts: packageJson.scripts,
      'lint-staged': packageJson['lint-staged'],
    })
  })
})

describe('mergePackageJsonConfigs', () => {
  it('should merge scripts in given packageJson and replace other configs by given configurations', () => {
    const packageJsonA = {
      scripts: {
        start: 'foo',
        test: 'bar',
      },
      'lint-staged': {
        'js/**/*': ['prettier --write', 'git add'],
      },
      husky: {
        hooks: {
          'pre-push': 'echo "hello!";',
        },
      },
    }
    const packageJsonB = {
      scripts: {
        start: 'bar',
        publish: 'baz',
      },
      husky: {
        hooks: {
          'pre-commit': 'echo "hello!";',
        },
      },
    }
    const packageJsonC = mergePackageJsonConfigs(packageJsonA, packageJsonB)

    expect(packageJsonC).toEqual({
      scripts: {
        start: 'bar',
        test: 'bar',
        publish: 'baz',
      },
      'lint-staged': {
        'js/**/*': ['prettier --write', 'git add'],
      },
      husky: {
        hooks: {
          'pre-commit': 'echo "hello!";',
        },
      },
    })
  })

  describe('getInjectStatus', () => {
    it('should return false if package.json is not exists', async () => {
      expect.assertions(1)
      mockFs({})

      const res = await getInjectStatus('.')

      expect(res).toBe(false)
    })

    it('should return false if sharec in package.json is not exist', async () => {
      expect.assertions(1)
      mockFs({
        'package.json': JSON.stringify({}),
      })

      const res = await getInjectStatus('.')

      expect(res).toBe(false)
    })

    it('should return false if sharec.injected in package.json is falsy', async () => {
      expect.assertions(1)
      mockFs({
        'package.json': JSON.stringify({
          sharec: {},
        }),
      })

      const res = await getInjectStatus('.')

      expect(res).toBe(false)
    })

    it('should return true if sharec.injected in package.json is truthy', async () => {
      expect.assertions(1)
      mockFs({
        'package.json': JSON.stringify({
          sharec: {
            injected: true,
          },
        }),
      })

      const res = await getInjectStatus('.')

      expect(res).toBe(true)
    })
  })

  describe('setAsInjected', () => {
    it('should set sharec.injected flag into target dir package.json file', async () => {
      expect.assertions(2)
      mockFs({
        'package.json': JSON.stringify({}),
      })

      const beforeInject = await getInjectStatus('.')

      expect(beforeInject).toBe(false)

      await setAsInjected('.')

      const afterInject = await getInjectStatus('.')

      expect(afterInject).toBe(true)
    })
  })
})
