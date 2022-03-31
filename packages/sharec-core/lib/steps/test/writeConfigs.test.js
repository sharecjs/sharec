const { vol } = require('memfs')
const writeConfigs = require('../writeConfigs')

describe('steps > writeConfigs', () => {
  beforeEach(() => {
    vol.reset()
  })

  it('writes merged configs', async () => {
    const input = {
      targetPath: '/target',
      mergedConfigs: {
        '/target/foo.txt': 'foo',
        '/target/bar.txt': 'bar',
        '/target/baz.txt': 'baz',
      },
    }

    vol.fromJSON({}, '/')

    await writeConfigs(input)

    expect(vol.readFileSync('/target/foo.txt', 'utf8')).toEqual('foo\n')
    expect(vol.readFileSync('/target/bar.txt', 'utf8')).toEqual('bar\n')
    expect(vol.readFileSync('/target/baz.txt', 'utf8')).toEqual('baz\n')
  })
})
