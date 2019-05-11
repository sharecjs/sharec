jest.mock('chalk', () => ({
  red: jest.fn(),
  green: jest.fn(),
  yellow: jest.fn(),
}))
jest.mock('lib', () => ({
  setAsInjected: jest.fn(),
  getInjectStatus: jest.fn().mockResolvedValue(false),
  getConfigs: jest.fn(),
  getDependenciesFromConfigs: jest.fn(),
  installConfigsDependencies: jest.fn(),
  extractPackageJsonConfigs: jest.fn(),
  mergePackageJsonConfigs: jest.fn(),
  copyConfigs: jest.fn(),
  updatePackageJson: jest.fn(),
}))

const chalk = require('chalk')
const mockFs = require('mock-fs')
const lib = require('lib')
const sharec = require('index')

describe('sharec – base', () => {
  beforeAll(() => {
    jest.spyOn(console, 'info')
    jest.spyOn(console, 'error')
    jest.spyOn(console, 'warn')
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })

  afterEach(() => {
    mockFs.restore()
  })

  it('should prints start message', async () => {
    expect.assertions(2)

    await sharec('.')

    expect(chalk.green).toBeCalledWith('sharec: extracting configs 📦')
    expect(console.info).toBeCalled()
  })

  it('should prints an error if configs dir is not exists', async () => {
    expect.assertions(2)

    const error = new Error('ENOENT')

    lib.getConfigs.mockRejectedValueOnce(error)

    await sharec('.')

    expect(chalk.red).toBeCalledWith(
      'sharec: configs dir is not exists in current configuration!',
    )
    expect(console.error).toBeCalled()
  })

  it('should install dependencies from configs', async () => {
    expect.assertions(1)
    lib.getConfigs.mockResolvedValueOnce(['package.json'])
    lib.getDependenciesFromConfigs.mockResolvedValueOnce({
      dependencies: {
        foo: '^1.0.0',
      },
      devDependencies: {
        bar: '^1.0.0',
      },
    })

    await sharec('.')

    expect(lib.installConfigsDependencies).toBeCalledWith('.', {
      dependencies: {
        foo: '^1.0.0',
      },
      devDependencies: {
        bar: '^1.0.0',
      },
    })
  })

  it('should inject sharec injection status', async () => {
    expect.assertions(1)

    await sharec('.')

    expect(lib.setAsInjected).toBeCalledWith('.')
  })

  it('should not do anything if sharec already injected', async () => {
    expect.assertions(2)

    lib.getInjectStatus.mockResolvedValueOnce(true)

    await sharec('.')

    expect(chalk.yellow).toBeCalledWith(
      'sharec: already was injected. You can remove sharec property from your package.json, only if you really shure! ☝️',
    )
    expect(console.warn).toBeCalled()
  })
})
