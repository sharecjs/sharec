const { fixtures } = require('testUtils')
const { vol } = require('memfs')
const sharec = require('../')

describe('sharec > disappear', () => {
  const packageFxt = fixtures('atomic/package/json/03-disappear')
  const babelFxt = fixtures('atomic/babel/json/06-disappear')
  const eslintFxt = fixtures('atomic/eslint/json/03-disappear')
  const yaspellerFxt = fixtures('atomic/yaspeller/json/02-disappear')

  const targetProcess = {
    argv: [null, null, '--disappear'],
    env: {
      PWD: '/configuration-package',
      INIT_CWD: '/target',
    },
    exit: jest.fn(),
  }

  beforeEach(() => {
    vol.reset()
  })

  it('should install configs to the target project without cache and meta writing', async done => {
    expect.assertions(4)

    const dir = {
      '/configuration-package/configs/.eslintrc': eslintFxt.upcoming,
      '/configuration-package/configs/.babelrc': babelFxt.upcoming,
      '/configuration-package/configs/.yaspellerrc': yaspellerFxt.upcoming,
      '/configuration-package/configs/package.json': packageFxt.upcoming,
      '/configuration-package/package.json': JSON.stringify({
        name: 'awesome-config',
        version: '1.0.0',
      }),
      '/target/.eslintrc': eslintFxt.current,
      '/target/.babelrc': babelFxt.current,
      '/target/.yaspellerrc': yaspellerFxt.current,
      '/target/package.json': packageFxt.current,
    }
    vol.fromJSON(dir, '/')

    await sharec(targetProcess)

    expect(vol.readFileSync('/target/.babelrc', 'utf8')).toEqual(babelFxt.result)
    expect(vol.readFileSync('/target/.eslintrc', 'utf8')).toEqual(eslintFxt.result)
    expect(vol.readFileSync('/target/.yaspellerrc', 'utf8')).toEqual(yaspellerFxt.result)
    expect(vol.readFileSync('/target/package.json', 'utf8')).toEqual(packageFxt.result)

    try {
      vol.readdirSync('/target/node_modules/.cache/sharec/awesome-config/1.0.0')
    } catch (err) {
      done()
    }
  })
})
