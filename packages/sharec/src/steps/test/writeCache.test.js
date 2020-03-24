const { vol } = require('memfs')
const writeCache = require('../writeCache')

describe('steps > writeCache', () => {
  beforeEach(() => {
    vol.reset()
  })

  it('should write configs from input to cache dir', async () => {
    expect.assertions(2)

    const targetPackage = {}
    const upcomingPackage = {
      name: 'awesome-config',
      version: '0.0.0',
    }
    const upcomingConfigs = {
      '.eslintrc': 'foo',
      '.editorconfig': 'bar',
      '.babelrc': 'baz',
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

    await writeCache(input)

    const cachedConfigs = vol.readdirSync(
      '/target/node_modules/.cache/sharec/awesome-config/0.0.0',
    )

    expect(cachedConfigs).toHaveLength(3)
    expect(cachedConfigs).toEqual(
      expect.arrayContaining(Object.keys(upcomingConfigs)),
    )
  })
})
