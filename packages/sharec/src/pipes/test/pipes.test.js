const { getConfigPipe, getFallbackConfigPipe } = require('../index')

describe('strategies > pipes', () => {
  describe('getFallbackConfigPipe', () => {
    it('should return fallback pipe for json files', () => {
      expect(getFallbackConfigPipe('/configs/foo.json')).not.toBeNull()
    })

    it('should return fallback pipe for yaml files', () => {
      expect(getFallbackConfigPipe('/configs/foo.yaml')).not.toBeNull()
    })

    it('should return null if file has not fallback pipe', () => {
      expect(getFallbackConfigPipe('/configs/.simpsonsrc')).toBeNull()
    })
  })

  describe('getConfigPipe', () => {
    it('should return pipe by given config path', () => {
      expect(getConfigPipe('/configs/.eslintrc')).not.toBeNull()
    })

    it('should return fallback pipes for json and yaml files', () => {
      expect(getConfigPipe('/configs/foo.json')).not.toBeNull()
      expect(getConfigPipe('/configs/foo.yaml')).not.toBeNull()
    })

    it('should return null if pipe is not exist for given config', () => {
      expect(getConfigPipe('/configs/.simpsonsrc')).toBeNull()
    })

    it('should return alias for .gitignore and .npmignore', () => {
      expect(getConfigPipe('/configs/npmignore').alias).toBe('.npmignore')
      expect(getConfigPipe('/configs/gitignore').alias).toBe('.gitignore')
    })

    it('should not return any alias for config without aliases', () => {
      expect(getConfigPipe('/configs/package.json').alias).toBeUndefined()
    })
  })
})
