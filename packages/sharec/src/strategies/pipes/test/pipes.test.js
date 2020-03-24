const { getConfigPipe } = require('../index')

describe('strategies > pipes > getConfigPipe', () => {
  it('should return pipe by given config path', () => {
    expect(getConfigPipe('/configs/.eslintrc')).not.toBeNull()
  })

  it('should return null if pipe is not exist for given config', () => {
    expect(getConfigPipe('/configs/.simpsonsrc')).toBeNull()
  })
})
