const path = require('path')
const { vol } = require('memfs')
const { cacheConfig, cacheConfigs, loadCache } = require('../cache')

describe('core > configs > cache >', () => {
  const cacheDir = '/target/node_modules/.cache/sharec/awesome-config/1.0.0'

  beforeEach(() => {
    vol.reset()
  })

  describe('cacheConfig', () => {
    it('should cache config source to target path node_modules/.cache', async () => {
      expect.assertions(1)

      vol.fromJSON({}, '/')

      await cacheConfig({
        configsName: 'awesome-config',
        configsVersion: '1.0.0',
        configPath: '_templates/exampleCss.ejs.t',
        configSource: 'foo',
        targetPath: '/target',
      })

      expect(
        vol.readFileSync(
          path.join(cacheDir, '_templates/exampleCss.ejs.t'),
          'utf8',
        ),
      ).toEqual('foo')
    })
  })

  describe('cacheConfigs', () => {
    it('should cache configs to target path node_modules/.cache', async () => {
      expect.assertions(3)

      vol.fromJSON({}, '/')

      await cacheConfigs({
        configsName: 'awesome-config',
        configsVersion: '1.0.0',
        configs: {
          '_templates/exampleHtml.ejs.t': 'foo',
          '_templates/exampleCss.ejs.t': 'bar',
          '_templates/exampleJs.ejs.t': 'baz',
        },
        targetPath: '/target',
      })

      expect(
        vol.readFileSync(
          path.join(cacheDir, '_templates/exampleHtml.ejs.t'),
          'utf8',
        ),
      ).toEqual('foo')
      expect(
        vol.readFileSync(
          path.join(cacheDir, '_templates/exampleCss.ejs.t'),
          'utf8',
        ),
      ).toEqual('bar')
      expect(
        vol.readFileSync(
          path.join(cacheDir, '_templates/exampleJs.ejs.t'),
          'utf8',
        ),
      ).toEqual('baz')
    })
  })

  describe('loadCache', () => {
    it('should load configs cache by name and version', async () => {
      const dir = {
        [path.join(cacheDir, '_templates/exampleHtml.ejs.t')]: 'foo',
        [path.join(cacheDir, '_templates/exampleCss.ejs.t')]: 'bar',
        [path.join(cacheDir, '_templates/exampleJs.ejs.t')]: 'baz',
      }
      vol.fromJSON(dir, '/')

      const cache = await loadCache({
        targetPath: '/target',
        configsName: 'awesome-config',
        configsVersion: '1.0.0',
      })

      expect(cache).toEqual({
        '_templates/exampleHtml.ejs.t': 'foo',
        '_templates/exampleCss.ejs.t': 'bar',
        '_templates/exampleJs.ejs.t': 'baz',
      })
    })

    it('should return null if configs with given name and version were not cached', async () => {})
  })
})
