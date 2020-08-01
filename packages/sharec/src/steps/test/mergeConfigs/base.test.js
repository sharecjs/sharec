const { vol } = require('memfs')
const { createFakeSpinner, createFakePrompt } = require('testUtils')
const mergeConfigs = require('../../mergeConfigs')

describe('steps > mergeConfigs > base', () => {
  let spinner
  let prompt

  beforeEach(() => {
    spinner = createFakeSpinner()
    prompt = createFakePrompt()
    vol.reset()
  })

  it('should write basic configs from input to target dir', async () => {
    const targetPackage = {
      name: 'awesome-project',
      version: '0.0.0',
    }
    const upcomingPackage = {
      name: 'awesome-config',
      version: '0.0.0',
    }
    const upcomingConfigs = {
      '.editorconfig': 'bar',
    }
    const input = {
      targetPath: '/target',
      configs: upcomingConfigs,
      mergedConfigs: {},
      options: {},
      upcomingPackage,
    }
    const dir = {
      '/target/package.json': JSON.stringify(targetPackage),
    }
    vol.fromJSON(dir, '/configs')

    const output = await mergeConfigs({ spinner, prompt })(input)

    expect(output.mergedConfigs).toEqual({
      '/target/.editorconfig': upcomingConfigs['.editorconfig'],
    })
  })
})
