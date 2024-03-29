const { fixtures } = require('testUtils')
const { vol } = require('memfs')
const mergeConfigsPackages = require('../../mergeConfigsPackages')

describe('steps > mergeConfigsPackages > configs', () => {
  const semaphore = {
    start: jest.fn(),
    success: jest.fn(),
    error: jest.fn(),
    fail: jest.fn(),
  }
  let context

  const eslintBaseFxt = fixtures('eslint/json/01-base')
  const babelBaseFxt = fixtures('babel/json/00-base')
  const npmignoreBaseFxt = fixtures('npmignore/lines/00-base')
  const gitignoreBaseFxt = fixtures('gitignore/lines/00-base')
  const yaspellerBaseFxt = fixtures('yaspeller/json/00-base')

  beforeEach(() => {
    jest.clearAllMocks()
    vol.reset()
  })

  it('merges and writes configs', async () => {
    const upcomingConfigs = [
      {
        name: 'awesome-config',
        version: '1.0.0',
        configs: {
          '.eslintrc': eslintBaseFxt.upcoming,
          '.babelrc': babelBaseFxt.upcoming,
          '.npmignore': npmignoreBaseFxt.upcoming,
          '.gitignore': gitignoreBaseFxt.upcoming,
          '.yaspellerrc': yaspellerBaseFxt.upcoming,
        },
      },
    ]
    context = {
      targetPath: '/target',
      configs: upcomingConfigs,
      mergedConfigs: {},
      options: {},
    }
    const dir = {
      '/target/.eslintrc': eslintBaseFxt.current,
      '/target/.babelrc': babelBaseFxt.current,
      '/target/.npmignore': npmignoreBaseFxt.current,
      '/target/.gitignore': gitignoreBaseFxt.current,
      '/target/.yaspellerrc': yaspellerBaseFxt.current,
    }
    vol.fromJSON(dir, '/configs')

    const output = await mergeConfigsPackages(context, semaphore)

    expect(output.mergedConfigs['/target/.eslintrc']).toMatchSnapshot()
    expect(output.mergedConfigs['/target/.babelrc']).toMatchSnapshot()
    expect(output.mergedConfigs['/target/.npmignore']).toMatchSnapshot()
    expect(output.mergedConfigs['/target/.gitignore']).toMatchSnapshot()
    expect(output.mergedConfigs['/target/.yaspellerrc']).toMatchSnapshot()
  })
})
