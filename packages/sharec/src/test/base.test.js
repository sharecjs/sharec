jest.mock('chalk', () => ({
  red: jest.fn(),
  green: jest.fn(),
}))
jest.mock('lib', () => ({
  getConfigs: jest.fn(),
  getDependenciesFromConfigs: jest.fn(),
  installConfigsDependencies: jest.fn(),
  extractPackageJsonConfigs: jest.fn(),
  mergePackageJsonConfigs: jest.fn(),
}))

const chalk = require('chalk')
const mockFs = require('mock-fs')
const lib = require('lib')
const sharec = require('index')

describe('sharec – base', () => {
  beforeAll(() => {
    jest.spyOn(console, 'info')
    jest.spyOn(console, 'error')
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })

  afterEach(() => {
    mockFs.restore()
  })

  it('should prints start message', async () => {
    await sharec(process.cwd())

    expect(chalk.green).toBeCalledWith('sharec: extracting configs 📦')
    expect(console.info).toBeCalled()
  })

  it('should prints an error if configs dir is not exists', async () => {
    const error = new Error('ENOENT')

    lib.getConfigs.mockRejectedValueOnce(error)

    await sharec(process.cwd())

    expect(chalk.red).toBeCalledWith(
      'sharec: configs dir is not exists in current configuration!',
    )
    expect(console.error).toBeCalled()
  })

  it('should install dependencies from configs', async () => {
    lib.getConfigs.mockResolvedValueOnce(['package.json'])
    lib.extractPackageJsonConfigs.mockResolvedValueOnce({
      dependencies: {
        foo: '^1.0.0',
      },
      devDependencies: {
        bar: '^1.0.0',
      },
    })

    await sharec(process.cwd())

    expect(lib.installConfigsDependencies).toBeCalledWith({
      dependencies: {
        foo: '^1.0.0',
      },
      devDependencies: {
        bar: '^1.0.0',
      },
    })
  })
})
