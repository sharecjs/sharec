const { fixtures } = require('testUtils')
const { vol } = require('memfs')
const mergeConfigsPackages = require('../mergeConfigsPackages')

describe('steps > mergeConfigsPackages > mixed', () => {
  const packageBaseFxt = fixtures('package/json/00-base')
  const eslintBaseFxt = fixtures('eslint/json/01-base')
  const babelBaseFxt = fixtures('babel/json/00-base')
  const npmignoreBaseFxt = fixtures('npmignore/lines/00-base')
  const gitignoreBaseFxt = fixtures('gitignore/lines/00-base')
  const yaspellerBaseFxt = fixtures('yaspeller/json/00-base')

  beforeEach(() => {
    vol.reset()
  })

  it('merge and writes configs and package.json', async () => {
    const input = {
      targetPath: '/target',
      options: {},
      mergedConfigs: {},
      configs: [
        {
          name: 'awesome-config',
          version: '1.0.0',
          configs: {
            'package.json': packageBaseFxt.upcoming,
            '.eslintrc': eslintBaseFxt.upcoming,
            '.babelrc': babelBaseFxt.upcoming,
            '.npmignore': npmignoreBaseFxt.upcoming,
            '.gitignore': gitignoreBaseFxt.upcoming,
            '.yaspellerrc': yaspellerBaseFxt.upcoming,
          },
        },
      ],
    }
    const dir = {
      '/target/package.json': packageBaseFxt.current,
      '/target/.eslintrc': eslintBaseFxt.current,
      '/target/.babelrc': babelBaseFxt.current,
      '/target/.npmignore': npmignoreBaseFxt.current,
      '/target/.gitignore': gitignoreBaseFxt.current,
      '/target/.yaspellerrc': yaspellerBaseFxt.current,
    }
    vol.fromJSON(dir, '/configs')

    const output = await mergeConfigsPackages(input)

    expect(output.mergedConfigs['/target/.eslintrc']).toMatchSnapshot()
    expect(output.mergedConfigs['/target/.babelrc']).toMatchSnapshot()
    expect(output.mergedConfigs['/target/.npmignore']).toMatchSnapshot()
    expect(output.mergedConfigs['/target/.gitignore']).toMatchSnapshot()
    expect(output.mergedConfigs['/target/.yaspellerrc']).toMatchSnapshot()
    expect(output.mergedConfigs['/target/package.json']).toMatchSnapshot()
  })
})
