const { vol } = require('memfs')
const { createFakeSpinner } = require('testUtils')
const writeConfigs = require('../../writeConfigs')

describe('steps > writeConfigs > base', () => {
  beforeEach(() => {
    vol.reset()
  })

  it('should write basic configs from input to target dir', async () => {
    const spinner = createFakeSpinner()
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
      options: {},
      upcomingPackage,
    }
    const dir = {
      '/target/package.json': JSON.stringify(targetPackage),
    }
    vol.fromJSON(dir, '/configs')

    await writeConfigs(spinner)(input)

    expect(vol.readFileSync('/target/.editorconfig', 'utf8')).toWraplessEqual(upcomingConfigs['.editorconfig'])
  })
})
