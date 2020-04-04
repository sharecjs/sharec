const { fixtures, createFakeSpinner } = require('testUtils')
const { vol } = require('memfs')
const writeConfigs = require('../../writeConfigs')

describe('steps > writeConfigs > configs', () => {
  const eslintBaseFxt = fixtures('atomic/eslint/json/01-base')
  const babelBaseFxt = fixtures('atomic/babel/json/00-base')
  const npmignoreBaseFxt = fixtures('atomic/npmignore/lines/00-base')
  const gitignoreBaseFxt = fixtures('atomic/gitignore/lines/00-base')
  const yaspellerBaseFxt = fixtures('atomic/yaspeller/json/00-base')

  beforeEach(() => {
    vol.reset()
  })

  it('should write and merge configs from input to target dir', async () => {
    const spinner = createFakeSpinner()
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

    await writeConfigs(spinner)(input)

    expect(vol.readFileSync('/target/.eslintrc', 'utf8')).toWraplessEqual(eslintBaseFxt.result)
    expect(vol.readFileSync('/target/.babelrc', 'utf8')).toWraplessEqual(babelBaseFxt.result)
    expect(vol.readFileSync('/target/.npmignore', 'utf8')).toWraplessEqual(npmignoreBaseFxt.result)
    expect(vol.readFileSync('/target/.gitignore', 'utf8')).toWraplessEqual(gitignoreBaseFxt.result)
    expect(vol.readFileSync('/target/.yaspellerrc', 'utf8')).toWraplessEqual(yaspellerBaseFxt.result)
  })
})
