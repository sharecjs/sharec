const { vol } = require('memfs')
const { createFakeSpinner, createFakePrompt } = require('testUtils')
const writeConfigs = require('../writeConfigs')

describe('steps > writeConfigs', () => {
  let spinner
  let prompt

  beforeEach(() => {
    spinner = createFakeSpinner()
    prompt = createFakePrompt()
    vol.reset()
  })

  it('should write merged configs', async () => {
    const input = {
      targetPath: '/target',
      mergedConfigs: {
        '/target/foo.txt': 'foo',
        '/target/bar.txt': 'bar',
        '/target/baz.txt': 'baz',
      },
    }

    vol.fromJSON({}, '/')

    await writeConfigs({ spinner, prompt })(input)

    expect(vol.readFileSync('/target/foo.txt', 'utf8')).toEqual('foo')
    expect(vol.readFileSync('/target/bar.txt', 'utf8')).toEqual('bar')
    expect(vol.readFileSync('/target/baz.txt', 'utf8')).toEqual('baz')
  })
})
