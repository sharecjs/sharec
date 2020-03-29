const { fixtures } = require('testUtils')
const { vol } = require('memfs')
const sharec = require('../')

describe('sharec > overwrite', () => {
  const packageFxt = fixtures('atomic/package/json/04-overwrite')
  const babelFxt = fixtures('atomic/babel/json/00-base')
  const eslintFxt = fixtures('atomic/eslint/json/01-base')

  const targetProcess = {
    argv: [null, null, '--overwrite'],
    env: {
      PWD: '/configuration-package',
      INIT_CWD: '/target',
    },
    exit: jest.fn(),
  }

  beforeEach(() => {
    vol.reset()
  })

  it('should overwrite current with upcoming in overwrite mode', async done => {
    expect.assertions(3)

    const dir = {
      '/configuration-package/configs/.eslintrc': eslintFxt.upcoming,
      '/configuration-package/configs/.babelrc': babelFxt.upcoming,
      '/configuration-package/configs/package.json': packageFxt.upcoming,
      '/configuration-package/package.json': JSON.stringify({
        name: 'awesome-config',
        version: '1.0.0',
      }),
      '/target/.eslintrc': eslintFxt.current,
      '/target/.babelrc': babelFxt.current,
      '/target/package.json': packageFxt.current,
    }
    vol.fromJSON(dir, '/')

    await sharec(targetProcess)

    expect(vol.readFileSync('/target/.babelrc', 'utf8')).toEqual(babelFxt.upcoming)
    expect(vol.readFileSync('/target/.eslintrc', 'utf8')).toEqual(eslintFxt.upcoming)
    expect(vol.readFileSync('/target/package.json', 'utf8')).toEqual(packageFxt.result)

    try {
      vol.readdirSync('/target/node_modules/.cache/sharec/awesome-config/1.0.0')
    } catch (err) {
      done()
    }
  })
})
