const { vol } = require('memfs')
const readCache = require('../readCache')

describe('steps > readCache', () => {
  beforeEach(() => {
    vol.reset()
  })

  it('should read cached configs for previous installed version', async () => {
    const targetPackage = {
      sharec: {
        config: 'awesome-config',
        version: '0.0.0',
      },
    }
    const input = {
      targetPath: '/target',
      cache: {},
      options: {},
      targetPackage,
    }
    const dir = {
      '/target/package.json': JSON.stringify(targetPackage),
      '/target/node_modules/.cache/sharec/awesome-config/0.0.0/.eslintrc': 'foo',
      '/target/node_modules/.cache/sharec/awesome-config/0.0.0/.editorconfig': 'bar',
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
    const targetPackage = {
      sharec: {
        config: 'awesome-config',
        version: '0.0.0',
      },
    }
    const input = {
      targetPath: '/target',
      cache: {},
      options: {},
      targetPackage,
    }
    const dir = {
      '/target/package.json': JSON.stringify(targetPackage),
    }
    vol.fromJSON(dir, '/configs')

    const output = await readCache(input)

    expect(output.cache).toEqual({})
  })

  it('should keep cache empty if previous installed cache is not contain any file', async () => {
    const targetPackage = {
      sharec: {
        config: 'awesome-config',
        version: '0.0.0',
      },
    }
    const input = {
      targetPath: '/target',
      cache: {},
      options: {},
      targetPackage,
    }
    const dir = {
      '/target/package.json': JSON.stringify(targetPackage),
      '/target/node_modules/.cache/sharec/awesome-config/0.0.0': {},
    }
    vol.fromJSON(dir, '/configs')

    const output = await readCache(input)

    expect(output.cache).toEqual({})
  })

  it('should read cached configs from .sharec/.cache if includeCache option is passed', async () => {
    const targetPackage = {
      sharec: {
        config: 'awesome-config',
        version: '0.0.0',
      },
    }
    const input = {
      targetPath: '/target',
      cache: {},
      options: {
        includeCache: true,
      },
      targetPackage,
    }
    const dir = {
      '/target/package.json': JSON.stringify(targetPackage),
      '/target/.sharec/.cache/awesome-config/0.0.0/.eslintrc': 'foo',
      '/target/.sharec/.cache/awesome-config/0.0.0/.editorconfig': 'bar',
      '/target/.sharec/.cache/awesome-config/0.0.0/.babelrc': 'baz',
    }
    vol.fromJSON(dir, '/configs')

    const output = await readCache(input)

    expect(output.cache).toEqual({
      '.eslintrc': 'foo',
      '.editorconfig': 'bar',
      '.babelrc': 'baz',
    })
  })
})
