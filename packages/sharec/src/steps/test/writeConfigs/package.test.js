const { fixtures } = require('testUtils')
const { vol } = require('memfs')
const writeConfigs = require('../../writeConfigs')

describe('steps > writeConfigs > package', () => {
  const packageBaseFxt = fixtures('atomic/package/json/00-base')

  beforeEach(() => {
    vol.reset()
  })

  it('should write and merge package.json from input to target dir', async () => {
    expect.assertions(1)

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
      upcomingPackage,
    }
    const dir = {
      '/target/package.json': packageBaseFxt.current,
    }
    vol.fromJSON(dir, '/configs')

    await writeConfigs(input)

    expect(packageBaseFxt.result).toMatch(
      vol.readFileSync('/target/package.json', 'utf8'),
    )
  })
})
