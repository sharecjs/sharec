const { vol } = require('memfs')
const { fixtures } = require('testUtils')
const mergeConfigs = require('../../mergeConfigs')

describe('steps > mergeConfigs > base', () => {
  const defaultFxt = fixtures('default/json/00-base')

  beforeEach(() => {
    vol.reset()
  })

  context('without sharec config', () => {
    it('merges configs', async () => {
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

      const output = await mergeConfigs(input)

      expect(output.mergedConfigs).toEqual({
        '/target/.editorconfig': upcomingConfigs['.editorconfig'],
      })
    })
  })

  context('with sharec config', () => {
    it('overwrites forced configs', async () => {
      const upcomingConfigs = {
        'foo.json': defaultFxt.upcoming,
      }
      const input = {
        targetPath: '/target',
        configs: upcomingConfigs,
        sharecConfig: {
          configs: {
            'foo.json': {
              overwrite: true,
            },
          },
        },
        mergedConfigs: {},
        options: {},
      }
      const dir = {
        '/target/foo.json': defaultFxt.current,
      }
      vol.fromJSON(dir, '/configs')

      const output = await mergeConfigs(input)

      expect(output.mergedConfigs).toEqual({
        '/target/foo.json': defaultFxt.upcoming,
      })
    })
  })
})
