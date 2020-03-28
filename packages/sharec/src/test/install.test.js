const { fixtures } = require('testUtils')
const { vol } = require('memfs')
const sharec = require('../')

describe('sharec > install', () => {
  const packageFxt = fixtures('atomic/package/json/01-install')
  const babelFxt = fixtures('atomic/babel/json/00-base')
  const eslintFxt = fixtures('atomic/eslint/json/01-base')

  const targetProcess = {
    argv: [null, null, 'install'],
    env: {
      PWD: '/configuration-package',
      INIT_CWD: '/target',
    },
    exit: jest.fn(),
  }

  beforeEach(() => {
    vol.reset()
  })

  it('should install configs to the target project', async () => {
    expect.assertions(5)

    const dir = {
      '/target/.eslintrc': eslintFxt.current,
      '/target/.babelrc': babelFxt.current,
      '/target/package.json': packageFxt.current,
      '/configuration-package/configs/.eslintrc': eslintFxt.upcoming,
      '/configuration-package/configs/.editorconfig': 'bar',
      '/configuration-package/configs/.babelrc': babelFxt.upcoming,
      '/configuration-package/package.json': JSON.stringify({
        name: 'awesome-config',
        version: '1.0.0',
      }),
      '/configuration-package/configs/package.json': packageFxt.upcoming,
    }
    vol.fromJSON(dir, '/')

    await sharec(targetProcess)

    expect(vol.readFileSync('/target/.eslintrc', 'utf8')).toEqual(eslintFxt.result)
    expect(vol.readFileSync('/target/.babelrc', 'utf8')).toEqual(babelFxt.result)
    expect(vol.readFileSync('/target/.editorconfig', 'utf8')).toEqual('bar')
    expect(vol.readFileSync('/target/package.json', 'utf8')).toEqual(packageFxt.result)
    expect(vol.readdirSync('/target/node_modules/.cache/sharec/awesome-config/1.0.0')).toHaveLength(4)
  })
})
