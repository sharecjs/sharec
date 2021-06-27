const { vol } = require('memfs')
const filterChanged = require('../filterChanged')

describe('steps > filterChanged', () => {
  beforeEach(() => {
    vol.reset()
  })

  context('with cache', () => {
    it('omits configs different to previously cached versions', async () => {
      const cachedConfigs = {
        '.eslintrc': '1',
        '.editorconfig': '1',
        '.babelrc': '1',
      }
      const localConfigs = {
        '/target/.eslintrc': '2',
        '/target/.editorconfig': '1',
        '/target/.babelrc': '1',
      }
      const upcomingConfigs = {
        '.eslintrc': '3',
        '.editorconfig': '3',
        '.babelrc': '3',
      }
      const input = {
        targetPath: '/target',
        configs: upcomingConfigs,
        local: localConfigs,
        cache: cachedConfigs,
        options: {},
      }

      const result = await filterChanged(input)

      expect(result.configs['.eslintrc']).toBeUndefined()
      expect(result.configs['.editorconfig']).toBe(upcomingConfigs['.editorconfig'])
      expect(result.configs['.babelrc']).toBe(upcomingConfigs['.babelrc'])
    })

    it('does not omit new configs', async () => {
      const cachedConfigs = {
        '.eslintrc': '1',
        '.editorconfig': '1',
        '.babelrc': '1',
      }
      const localConfigs = {
        '/target/.eslintrc': '2',
        '/target/.editorconfig': '1',
        '/target/.babelrc': '1',
      }
      const upcomingConfigs = {
        '.eslintrc': '3',
        '.editorconfig': '3',
        '.babelrc': '3',
        '.foorc': '3',
      }
      const input = {
        targetPath: '/target',
        configs: upcomingConfigs,
        local: localConfigs,
        cache: cachedConfigs,
        options: {},
      }

      const result = await filterChanged(input)

      expect(result.configs['.foorc']).toBe(upcomingConfigs['.foorc'])
    })
  })

  context('without cache', () => {
    it('returns input as is', async () => {
      const upcomingConfigs = {
        '.eslintrc': '1',
        '.editorconfig': '1',
        '.babelrc': '1',
      }
      const localConfigs = {
        '.eslintrc': '2',
        '.editorconfig': '1',
        '.babelrc': '1',
      }
      const input = {
        targetPath: '/target',
        configs: upcomingConfigs,
        local: localConfigs,
        options: {},
      }

      const result = await filterChanged(input)

      expect(result).toEqual(input)
    })
  })
})
