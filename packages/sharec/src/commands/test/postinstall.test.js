const { vol } = require('memfs')
const postinstall = require('../postinstall')

describe('hooks > postinstall >', () => {
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

    await postinstall('/target')

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

    await postinstall('/target')

    expect(
      JSON.parse(vol.readFileSync('/target/package.json', 'utf8')),
    ).toMatchSnapshot()
    expect(vol.readdirSync('/target')).toContain('configs')
  })

  it('should not do anything if target path is not passed', async () => {
    expect.assertions(1)

    const packageJson = {
      name: 'awesome-project',
    }
    const dir = {
      '/target/package.json': JSON.stringify(packageJson),
    }
    vol.fromJSON(dir)

    await postinstall(undefined)

    expect(
      JSON.parse(vol.readFileSync('/target/package.json', 'utf8')),
    ).toMatchSnapshot()
  })
})
