const { vol } = require('memfs')
const writeLockdata = require('./writeLockdata')

describe('steps > writeLockdata', () => {
  beforeEach(() => {
    vol.reset()
  })

  it('inserts installed configs verions to the target package.json', async () => {
    const context = {
      targetPath: '/',
      configs: [
        {
          name: 'foo',
          version: '1.0.0',
        },
        {
          name: 'bar',
          version: '2.0.0',
        },
      ],
    }
    const dir = {
      '/package.json': JSON.stringify({
        sharec: {
          configs: ['foo', 'bar'],
        },
      }),
    }

    vol.fromJSON(dir, '/')

    await writeLockdata(context)

    expect(JSON.parse(vol.readFileSync('/package.json', 'utf8'))).toEqual({
      sharec: {
        configs: ['foo', 'bar'],
        locked: {
          foo: '1.0.0',
          bar: '2.0.0',
        },
      },
    })
  })
})
