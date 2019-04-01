const mockFs = require('mock-fs')
const utils = require('../utils')

utils.exec = jest.fn()

const { getConfigs, getDependenciesFromConfigs, installConfigsDependencies, extractPackageJsonConfigs, mergePackageJsonConfigs } = require('../lib')

afterEach(() => {
  mockFs.restore()
});

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
        'package.json': '{}'
      }
    })  

    const configs = await getConfigs(process.cwd())

    expect(configs).toEqual(['.eslintrc', '.prettierrc', 'package.json'])
  })
})

describe('getDependenciesFromConfigs', () => {
  it('should extract dependencies if package.json exists in configs list', async () => {
    mockFs({
      'configs/package.json': JSON.stringify({
        dependencies: {
          foo: '^1.0.0'
        },
        devDependencies: {
          bar: '^1.0.0'
        }
      })
    })

    const configs = ['package.json']
    const res = await getDependenciesFromConfigs(process.cwd(), configs)

    expect(res).toEqual({
      dependencies: {
        foo: '^1.0.0'
      },
      devDependencies: {
        bar: '^1.0.0'
      }
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
    await installConfigsDependencies({
      dependencies: {
        foo: '^1.0.0'
      },
      devDependencies: {
        bar: '^1.0.0'
      }
    })

    expect(utils.exec).toBeCalledTimes(2)
    expect(utils.exec).toHaveBeenNthCalledWith(1, 'npm install --save foo@^1.0.0')
    expect(utils.exec).toHaveBeenNthCalledWith(2, 'npm install --save-dev bar@^1.0.0')
  })

  it('should install dependencies with yarn if it passed as package manager', async () => {
    await installConfigsDependencies({
      dependencies: {
        foo: '^1.0.0'
      },
      devDependencies: {
        bar: '^1.0.0'
      }
    }, 'yarn')

    expect(utils.exec).toBeCalledTimes(2)
    expect(utils.exec).toHaveBeenNthCalledWith(1, 'yarn add foo@^1.0.0')
    expect(utils.exec).toHaveBeenNthCalledWith(2, 'yarn add -D bar@^1.0.0')
  })

  it('should throw an error if passed package manager not equals to yarn or npm', async (done) => {
    try {
      await installConfigsDependencies({}, 'pnpm')
    } catch (err) {
      done()
    }
  })  

  it('should not do anything if dependencies are empty', async () => {
    await installConfigsDependencies({})

    expect(utils.exec).not.toBeCalled()
  })
})

describe('extractPackageJsonConfigs', () => {
  it('should extract all configs (non-basic fields, instead scripts) from package.json', async () => {
    const packageJson = {
      name: 'foo',
      version: '0.0.1',
      license: 'bar',
      scripts: {
        start: 'baz'
      },
      'lint-staged': {
        'js/**/*': [
          'prettier --write',
          'git add'
        ]
      }
    }

    mockFs({
      'configs/package.json': JSON.stringify(packageJson)
    })

    const configs = await extractPackageJsonConfigs(process.cwd(), ['package.json'])

    expect(configs).toEqual({
      scripts: packageJson.scripts,
      'lint-staged': packageJson['lint-staged']
    })
  })
})

describe('mergePackageJsonConfigs', () => {
  it('should merge scripts in given packageJson and replace other configs by given configurations', () => {
    const packageJsonA = {
      scripts: {
        start: 'foo',
        test: 'bar'
      },
      'lint-staged': {
        'js/**/*': [
          'prettier --write',
          'git add'
        ]
      },
      husky: {
        hooks: {
          'pre-push': 'echo "hello!";'
        }
      }
    } 
    const packageJsonB = {
      scripts: {
        start: 'bar',
        publish: 'baz'
      },
      husky: {
        hooks: {
          'pre-commit': 'echo "hello!";'
        }
      }
    }
    const packageJsonC = mergePackageJsonConfigs(packageJsonA, packageJsonB)

    expect(packageJsonC).toEqual({
      scripts: {
        start: 'bar',
        test: 'bar',
        publish: 'baz'
      },
      'lint-staged': {
        'js/**/*': [
          'prettier --write',
          'git add'
        ]
      },
      husky: {
        hooks: {
          'pre-commit': 'echo "hello!";'
        }
      }    
    })
  })
})