const { fixtures, createFakeSpinner } = require('testUtils')
const { vol } = require('memfs')
const writeConfigs = require('../../writeConfigs')

describe('steps > writeConfigs > package', () => {
  const packageBaseFxt = fixtures('atomic/package/json/00-base')

  beforeEach(() => {
    vol.reset()
  })

  it('should write and merge package.json from input to target dir', async () => {
    const spinner = createFakeSpinner()
    const upcomingPackage = {
      name: 'awesome-config',
      version: '0.0.0',
    }
    const upcomingConfigs = {
      'package.json': packageBaseFxt.upcoming,
    }
    const input = {
      targetPath: '/target',
      configs: upcomingConfigs,
      options: {},
      upcomingPackage,
    }
    const dir = {
      '/target/package.json': packageBaseFxt.current,
    }
    vol.fromJSON(dir, '/configs')

    await writeConfigs(spinner)(input)

    expect(vol.readFileSync('/target/package.json', 'utf8')).toWraplessEqual(packageBaseFxt.result)
  })
})
