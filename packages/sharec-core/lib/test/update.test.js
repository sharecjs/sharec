const { fixtures } = require('testUtils')
const { vol } = require('memfs')
const { sharec } = require('../')

describe.only('sharec > update', () => {
  const semaphore = {
    start: jest.fn(),
    error: jest.fn(),
    success: jest.fn(),
    fail: jest.fn(),
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('linear', () => {
    const packageFxt = fixtures('package/json/02-update')
    const babelFxt = fixtures('babel/json/05-update')
    const eslintFxt = fixtures('eslint/json/02-update')
    const gitignoreFxt = fixtures('gitignore/lines/02-update')
    const npmignoreFxt = fixtures('npmignore/lines/02-update')
    const yaspellerFxt = fixtures('yaspeller/json/01-update')
    const defaultJsonFxt = fixtures('default/json/00-base')
    const defaultYamlFxt = fixtures('default/yaml/00-base')
    const context = {
      targetPath: '/target',
      cache: {},
      configs: [],
      options: {
        cache: true,
      },
    }

    beforeEach(() => {
      jest.clearAllMocks()
      vol.reset()
    })

    it('updates configs', async () => {
      const dir = {
        // Upcoming
        '/target/node_modules/awesome-config/configs/folder/foo.json': defaultJsonFxt.upcoming,
        '/target/node_modules/awesome-config/configs/folder/foo.yaml': defaultYamlFxt.upcoming,
        '/target/node_modules/awesome-config/configs/.babelrc': babelFxt.upcoming,
        '/target/node_modules/awesome-config/configs/.eslintrc': eslintFxt.upcoming,
        '/target/node_modules/awesome-config/configs/.gitignore': gitignoreFxt.upcoming,
        '/target/node_modules/awesome-config/configs/.npmignore': npmignoreFxt.upcoming,
        '/target/node_modules/awesome-config/configs/.yaspellerrc': yaspellerFxt.upcoming,
        '/target/node_modules/awesome-config/configs/package.json': packageFxt.upcoming,
        '/target/node_modules/awesome-config/package.json': JSON.stringify({
          name: 'awesome-config',
          version: '2.0.0',
        }),
        // Cached
        '/target/node_modules/.cache/sharec/folder/foo.json': defaultJsonFxt.cached,
        '/target/node_modules/.cache/sharec/folder/foo.yaml': defaultYamlFxt.cached,
        '/target/node_modules/.cache/sharec/.babelrc': babelFxt.cached,
        '/target/node_modules/.cache/sharec/.eslintrc': eslintFxt.cached,
        '/target/node_modules/.cache/sharec/.gitignore': gitignoreFxt.cached,
        '/target/node_modules/.cache/sharec/.npmignore': npmignoreFxt.cached,
        '/target/node_modules/.cache/sharec/.yaspellerrc': yaspellerFxt.cached,
        '/target/node_modules/.cache/sharec/package.json': packageFxt.cached,
        // Current
        '/target/folder/foo.json': defaultJsonFxt.current,
        '/target/folder/foo.yaml': defaultYamlFxt.current,
        '/target/.babelrc': babelFxt.current,
        '/target/.eslintrc': eslintFxt.current,
        '/target/.gitignore': gitignoreFxt.current,
        '/target/.npmignore': npmignoreFxt.current,
        '/target/.yaspellerrc': yaspellerFxt.current,
        '/target/package.json': packageFxt.current,
      }

      vol.fromJSON(dir, '/')

      await sharec(context, semaphore)

      expect(vol.readFileSync('/target/folder/foo.json', 'utf8')).toMatchSnapshot()
      expect(vol.readFileSync('/target/folder/foo.yaml', 'utf8')).toMatchSnapshot()
      expect(vol.readFileSync('/target/.babelrc', 'utf8')).toMatchSnapshot()
      expect(vol.readFileSync('/target/.eslintrc', 'utf8')).toMatchSnapshot()
      expect(vol.readFileSync('/target/.gitignore', 'utf8')).toMatchSnapshot()
      expect(vol.readFileSync('/target/.npmignore', 'utf8')).toMatchSnapshot()
      expect(vol.readFileSync('/target/.yaspellerrc', 'utf8')).toMatchSnapshot()
      expect(vol.readFileSync('/target/package.json', 'utf8')).toMatchSnapshot()
    })
  })

  describe('with removed fields', () => {
    const packageFxt = fixtures('package/json/05-removed')
    const context = {
      targetPath: '/target',
      cache: {},
      configs: [],
      options: {
        cache: true,
      },
    }

    beforeEach(() => {
      jest.clearAllMocks()
      vol.reset()
    })

    it('updates configs', async () => {
      const dir = {
        // Upcoming
        '/target/node_modules/awesome-config/configs/package.json': packageFxt.upcoming,
        '/target/node_modules/awesome-config/package.json': JSON.stringify({
          name: 'awesome-config',
          version: '2.0.0',
        }),
        // Cached
        '/target/node_modules/.cache/sharec/package.json': packageFxt.cached,
        // Current
        '/target/package.json': packageFxt.current,
      }
      vol.fromJSON(dir, '/')

      await sharec(context, semaphore)

      expect(vol.readFileSync('/target/package.json', 'utf8')).toMatchSnapshot()
    })
  })

  describe('with removed configs', () => {
    const eslintFxt = fixtures('eslint/json/02-update')
    const packageFxt = fixtures('package/json/05-removed')
    const context = {
      targetPath: '/target',
      cache: {},
      configs: [],
      options: {
        cache: true,
      },
    }

    beforeEach(() => {
      jest.clearAllMocks()
      vol.reset()
    })

    it('updates configs', async () => {
      const dir = {
        // Upcoming
        '/target/node_modules/awesome-config/configs/package.json': packageFxt.upcoming,
        '/target/node_modules/awesome-config/configs/.eslintrc': eslintFxt.upcoming,
        '/target/node_modules/awesome-config/package.json': JSON.stringify({
          name: 'awesome-config',
          version: '2.0.0',
        }),
        // Cached
        '/target/node_modules/.cache/sharec/package.json': packageFxt.cached,
        '/target/node_modules/.cache/sharec/.eslintrc': eslintFxt.cached,
        // Current
        '/target/package.json': packageFxt.current,
      }
      vol.fromJSON(dir, '/')

      await sharec(context, semaphore)

      expect(vol.readdirSync('/target')).not.toContain('.eslintrc')
      expect(vol.readFileSync('/target/package.json', 'utf8')).toMatchSnapshot()
    })
  })
})
