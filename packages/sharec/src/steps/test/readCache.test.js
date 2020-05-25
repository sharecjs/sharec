const { vol } = require('memfs')
const { createFakeSpinner } = require('testUtils')
const readCache = require('../readCache')

describe('steps > readCache', () => {
  beforeEach(() => {
    vol.reset()
  })

  it('should read cached configs for previous installed version', async () => {
    const spinner = createFakeSpinner()
    const targetPackage = {
      sharec: {
        config: 'awesome-config',
        version: '0.0.0',
      },
    }
    const input = {
      targetPath: '/target',
      cache: {},
      targetPackage,
    }
    const dir = {
      '/target/package.json': JSON.stringify(targetPackage),
      '/target/node_modules/.cache/sharec/awesome-config/0.0.0/.eslintrc': 'foo',
      '/target/node_modules/.cache/sharec/awesome-config/0.0.0/.editorconfig': 'bar',
      '/target/node_modules/.cache/sharec/awesome-config/0.0.0/.babelrc': 'baz',
    }
    vol.fromJSON(dir, '/configs')

    const output = await readCache(spinner)(input)

    expect(output.cache).toEqual({
      '.eslintrc': 'foo',
      '.editorconfig': 'bar',
      '.babelrc': 'baz',
    })
  })

  it('should keep cache empty if previous installed cache is not exist', async () => {
    const spinner = createFakeSpinner()
    const targetPackage = {
      sharec: {
        config: 'awesome-config',
        version: '0.0.0',
      },
    }
    const input = {
      targetPath: '/target',
      cache: {},
      targetPackage,
    }
    const dir = {
      '/target/package.json': JSON.stringify(targetPackage),
    }
    vol.fromJSON(dir, '/configs')

    const output = await readCache(spinner)(input)

    expect(output.cache).toEqual({})
  })

  it('should keep cache empty if previous installed cache is not contain any file', async () => {
    const spinner = createFakeSpinner()
    const targetPackage = {
      sharec: {
        config: 'awesome-config',
        version: '0.0.0',
      },
    }
    const input = {
      targetPath: '/target',
      cache: {},
      targetPackage,
    }
    const dir = {
      '/target/package.json': JSON.stringify(targetPackage),
      '/target/node_modules/.cache/sharec/awesome-config/0.0.0': {},
    }
    vol.fromJSON(dir, '/configs')

    const output = await readCache(spinner)(input)

    expect(output.cache).toEqual({})
  })
})
