const { vol } = require('memfs')
const postinstall = require('../postinstall')

describe('hooks > postinstall >', () => {
  beforeEach(() => {
    vol.reset()
  })

  it('should inject postinstall and uninstall hooks to the target project package.json', async () => {
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
  })

  it('should not do anything if hooks already injected', async () => {
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
  })
})
