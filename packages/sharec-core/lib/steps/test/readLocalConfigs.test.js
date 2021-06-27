const { vol } = require('memfs')
const readLocalConfigs = require('../readLocalConfigs')

describe('steps > readLocalConfigs', () => {
  beforeEach(() => {
    vol.reset()
  })

  it('reads configs matched by name to uplcoming ones from target path', async () => {
    const upcomingConfigs = {
      '.eslintrc': '3',
      '.editorconfig': '3',
      '.babelrc': '3',
    }
    const dir = {
      '/target/package.json': 'foo',
      '/target/.eslintrc': 'bar',
      '/target/package-lock.json': 'baz',
      '/target/yarn.lock': 'foo',
    }
    const input = {
      targetPath: '/target',
      options: {},
      configs: upcomingConfigs,
    }

    vol.fromJSON(dir, '/')

    const output = await readLocalConfigs(input)

    expect(output.local).toEqual({
      '.eslintrc': 'bar',
    })
  })
})
