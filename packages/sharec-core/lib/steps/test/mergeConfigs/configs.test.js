const { fixtures } = require('testUtils')
const { vol } = require('memfs')
const mergeConfigs = require('../../mergeConfigs')

describe('steps > mergeConfigs > configs', () => {
  const eslintBaseFxt = fixtures('eslint/json/01-base')
  const babelBaseFxt = fixtures('babel/json/00-base')
  const npmignoreBaseFxt = fixtures('npmignore/lines/00-base')
  const gitignoreBaseFxt = fixtures('gitignore/lines/00-base')
  const yaspellerBaseFxt = fixtures('yaspeller/json/00-base')

  beforeEach(() => {
    vol.reset()
  })

  it('should write and merge configs from input to target dir', async () => {
    const upcomingPackage = {
      name: 'awesome-config',
      version: '0.0.0',
    }
    const upcomingConfigs = {
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
      configModes: {},
      options: {},
      upcomingPackage,
    }
    const dir = {
      '/target/.eslintrc': eslintBaseFxt.current,
      '/target/.babelrc': babelBaseFxt.current,
      '/target/.npmignore': npmignoreBaseFxt.current,
      '/target/.gitignore': gitignoreBaseFxt.current,
      '/target/.yaspellerrc': yaspellerBaseFxt.current,
    }
    vol.fromJSON(dir, '/configs')

    const output = await mergeConfigs(input)

    expect(output.mergedConfigs['/target/.eslintrc']).toWraplessEqual(eslintBaseFxt.result, { eof: false })
    expect(output.mergedConfigs['/target/.babelrc']).toWraplessEqual(babelBaseFxt.result, { eof: false })
    expect(output.mergedConfigs['/target/.npmignore']).toWraplessEqual(npmignoreBaseFxt.result, { eof: false })
    expect(output.mergedConfigs['/target/.gitignore']).toWraplessEqual(gitignoreBaseFxt.result, { eof: false })
    expect(output.mergedConfigs['/target/.yaspellerrc']).toWraplessEqual(yaspellerBaseFxt.result, { eof: false })
  })
})
