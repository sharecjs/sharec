const { vol } = require('memfs')
const readCache = require('../readCache')

describe('steps > readCache', () => {
  beforeEach(() => {
    vol.reset()
  })

  it('should read cached configs for previous installed version', async () => {
    expect.assertions(1)

    const targetPackage = {
      sharec: {
        config: 'awesome-config',
        version: '0.0.0',
      },
    }
    const input = {
      targetPath: '/target',
      targetPackage,
    }
    const dir = {
      '/target/package.json': JSON.stringify(targetPackage),
      '/target/node_modules/.cache/sharec/awesome-config/0.0.0/.eslintrc':
        'foo',
      '/target/node_modules/.cache/sharec/awesome-config/0.0.0/.editorconfig':
        'bar',
      '/target/node_modules/.cache/sharec/awesome-config/0.0.0/.babelrc': 'baz',
    }
    vol.fromJSON(dir, '/configs')

    const output = await readCache(input)

    expect(output.cache).toEqual({
      '.eslintrc': 'foo',
      '.editorconfig': 'bar',
      '.babelrc': 'baz',
    })
  })

  it('should keep cache empty if previous installed cache is not exist', async () => {
    expect.assertions(1)

    const targetPackage = {
      sharec: {
        config: 'awesome-config',
        version: '0.0.0',
      },
    }
    const input = {
      targetPath: '/target',
      cache: null,
      targetPackage,
    }
    const dir = {
      '/target/package.json': JSON.stringify(targetPackage),
    }
    vol.fromJSON(dir, '/configs')

    const output = await readCache(input)

    expect(output.cache).toBeNull()
  })

  it('should keep cache empty if previous installed cache is not contain any file', async () => {
    expect.assertions(1)

    const targetPackage = {
      sharec: {
        config: 'awesome-config',
        version: '0.0.0',
      },
    }
    const input = {
      targetPath: '/target',
      cache: null,
      targetPackage,
    }
    const dir = {
      '/target/package.json': JSON.stringify(targetPackage),
      '/target/node_modules/.cache/sharec/awesome-config/0.0.0': {},
    }
    vol.fromJSON(dir, '/configs')

    const output = await readCache(input)

    expect(output.cache).toBeNull()
  })
})
