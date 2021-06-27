const { vol } = require('memfs')
const { createFakeSpinner, createFakePrompt } = require('testUtils')
const writeCache = require('../writeCache')

describe('steps > writeCache', () => {
  let spinner
  let prompt

  beforeEach(() => {
    spinner = createFakeSpinner()
    prompt = createFakePrompt()
    vol.reset()
  })

  it('should write configs from input to cache dir', async () => {
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
      options: {},
    }
    const dir = {
      '/target/package.json': JSON.stringify(targetPackage),
    }
    vol.fromJSON(dir, '/configs')

    await writeCache({ spinner, prompt })(input)

    const cachedConfigs = vol.readdirSync('/target/node_modules/.cache/sharec/awesome-config/0.0.0')

    expect(cachedConfigs).toHaveLength(3)
    expect(cachedConfigs).toEqual(expect.arrayContaining(Object.keys(upcomingConfigs)))
  })

  it('should not write cache in disappear mode', async (done) => {
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
      options: {
        disappear: true,
      },
      upcomingPackage,
    }
    const dir = {
      '/target/package.json': JSON.stringify(targetPackage),
    }
    vol.fromJSON(dir, '/configs')

    await writeCache({ spinner, prompt })(input)

    try {
      vol.readdirSync('/target/node_modules/.cache/sharec/awesome-config/0.0.0')
    } catch (err) {
      done()
    }
  })

  it('should write cache right in project if includeCache parameter given', async (done) => {
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
      options: {
        includeCache: true,
      },
      upcomingPackage,
    }
    const dir = {
      '/target/package.json': JSON.stringify(targetPackage),
    }
    vol.fromJSON(dir, '/configs')

    await writeCache({ spinner, prompt })(input)

    const cachedConfigs = vol.readdirSync('/target/.sharec/.cache/awesome-config/0.0.0')

    expect(cachedConfigs).toHaveLength(3)
    expect(cachedConfigs).toEqual(expect.arrayContaining(Object.keys(upcomingConfigs)))

    try {
      vol.readdirSync('/target/node_modules/.cache/sharec/awesome-config/0.0.0')
    } catch (err) {
      done()
    }
  })
})
