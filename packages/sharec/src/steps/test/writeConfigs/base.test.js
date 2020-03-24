const { vol } = require('memfs')
const writeConfigs = require('../../writeConfigs')

describe('steps > writeConfigs > base', () => {
  beforeEach(() => {
    vol.reset()
  })

  it('should write basic configs from input to target dir', async () => {
    expect.assertions(1)

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
      upcomingPackage,
    }
    const dir = {
      '/target/package.json': JSON.stringify(targetPackage),
    }
    vol.fromJSON(dir, '/configs')

    await writeConfigs(input)

    expect(vol.readFileSync('/target/.editorconfig', 'utf8')).toEqual(
      upcomingConfigs['.editorconfig'],
    )
  })
})
