const { fixtures, createFakeSpinner } = require('testUtils')
const { vol } = require('memfs')
const mergeConfigs = require('../../mergeConfigs')

describe('steps > mergeConfigs > package', () => {
  const packageBaseFxt = fixtures('package/json/00-base')

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
      mergedConfigs: {},
      options: {},
      upcomingPackage,
    }
    const dir = {
      '/target/package.json': packageBaseFxt.current,
    }
    vol.fromJSON(dir, '/configs')

    const output = await mergeConfigs(spinner)(input)

    expect(output.mergedConfigs).toEqual({
      '/target/package.json': packageBaseFxt.result,
    })
  })
})
