const { fixtures, createFakeSpinner } = require('testUtils')
const { vol } = require('memfs')
const mergeConfigs = require('../../mergeConfigs')

describe('steps > mergeConfigs > mixed', () => {
  const packageBaseFxt = fixtures('package/json/00-base')
  const eslintBaseFxt = fixtures('eslint/json/01-base')
  const babelBaseFxt = fixtures('babel/json/00-base')
  const npmignoreBaseFxt = fixtures('npmignore/lines/00-base')
  const gitignoreBaseFxt = fixtures('gitignore/lines/00-base')
  const yaspellerBaseFxt = fixtures('yaspeller/json/00-base')

  beforeEach(() => {
    vol.reset()
  })

  it('should write and merge configs and package.json from input to target dir', async () => {
    const spinner = createFakeSpinner()
    const upcomingPackage = {
      name: 'awesome-config',
      version: '0.0.0',
    }
    const upcomingConfigs = {
      'package.json': packageBaseFxt.upcoming,
      '.eslintrc': eslintBaseFxt.upcoming,
      '.babelrc': babelBaseFxt.upcoming,
      '.npmignore': npmignoreBaseFxt.upcoming,
      '.gitignore': gitignoreBaseFxt.upcoming,
      '.yaspellerrc': yaspellerBaseFxt.upcoming,
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
      '/target/.eslintrc': eslintBaseFxt.current,
      '/target/.babelrc': babelBaseFxt.current,
      '/target/.npmignore': npmignoreBaseFxt.current,
      '/target/.gitignore': gitignoreBaseFxt.current,
      '/target/.yaspellerrc': yaspellerBaseFxt.current,
    }
    vol.fromJSON(dir, '/configs')

    const output = await mergeConfigs(spinner)(input)

    expect(output.mergedConfigs['/target/.eslintrc']).toWraplessEqual(eslintBaseFxt.result, { eol: false })
    expect(output.mergedConfigs['/target/.babelrc']).toWraplessEqual(babelBaseFxt.result, { eol: false })
    expect(output.mergedConfigs['/target/.npmignore']).toWraplessEqual(npmignoreBaseFxt.result, { eol: false })
    expect(output.mergedConfigs['/target/.gitignore']).toWraplessEqual(gitignoreBaseFxt.result, { eol: false })
    expect(output.mergedConfigs['/target/.yaspellerrc']).toWraplessEqual(yaspellerBaseFxt.result, { eol: false })
    expect(output.mergedConfigs['/target/package.json']).toWraplessEqual(packageBaseFxt.result, { eol: false })
  })
})
