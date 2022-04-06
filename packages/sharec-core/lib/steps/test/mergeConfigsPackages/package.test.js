const { fixtures } = require('testUtils')
const { vol } = require('memfs')
const mergeConfigsPackages = require('../../mergeConfigsPackages')

describe('steps > mergeConfigsPackages > package', () => {
  const semaphore = {
    start: jest.fn(),
    success: jest.fn(),
    error: jest.fn(),
    fail: jest.fn(),
  }
  let context

  const packageBaseFxt = fixtures('package/json/00-base')

  beforeEach(() => {
    vol.reset()
  })

  it('should write and merge package.json from input to target dir', async () => {
    context = {
      targetPath: '/target',
      configs: [
        {
          name: 'awesome-config',
          version: '1.0.0',
          configs: {
            'package.json': packageBaseFxt.upcoming,
          },
        },
      ],
      mergedConfigs: {},
      options: {},
    }
    const dir = {
      '/target/package.json': packageBaseFxt.current,
    }
    vol.fromJSON(dir, '/configs')

    const output = await mergeConfigsPackages(context, semaphore)

    expect(output.mergedConfigs['/target/package.json']).toMatchSnapshot()
  })
})
