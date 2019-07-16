const { vol } = require('memfs')
const init = require('../init')

describe('tasks > init >', () => {
  beforeEach(() => {
    vol.reset()
  })

  it('should inject postinstall and uninstall hooks to the target project package.json', async () => {
    expect.assertions(2)

    const packageJson = {
      name: 'awesome-project',
    }
    const dir = {
      '/target/package.json': JSON.stringify(packageJson),
    }
    vol.fromJSON(dir)

    await init('/target')

    expect(
      JSON.parse(vol.readFileSync('/target/package.json', 'utf8')),
    ).toMatchSnapshot()
    expect(vol.readdirSync('/target')).toContain('configs')
  })

  it('should not do anything if hooks already injected', async () => {
    expect.assertions(2)

    const packageJson = {
      name: 'awesome-project',
      scripts: {
        postinstall: 'sharec install',
        preuninstall: 'sharec remove',
      },
    }
    const dir = {
      '/target/package.json': JSON.stringify(packageJson),
    }
    vol.fromJSON(dir)

    await init('/target')

    expect(
      JSON.parse(vol.readFileSync('/target/package.json', 'utf8')),
    ).toMatchSnapshot()
    expect(vol.readdirSync('/target')).toContain('configs')
  })
})
