const { fixtures } = require('testUtils')
const { vol } = require('memfs')
const { sharec } = require('../../')

describe('sharec > install > base', () => {
  const packageFxt = fixtures('package/json/01-install')
  const babelFxt = fixtures('babel/json/00-base')
  const eslintFxt = fixtures('eslint/json/01-base')
  const npmignoreFxt = fixtures('npmignore/lines/00-base')
  const gitignoreFxt = fixtures('gitignore/lines/00-base')

  beforeEach(() => {
    jest.clearAllMocks()
    vol.reset()
  })

  describe('without cache', () => {
    const context = {
      targetPath: '/target',
      cache: {},
      configs: [],
      options: {
        cache: false,
      },
    }

    beforeEach(async () => {
      const dir = {
        '/target/.eslintrc': eslintFxt.current,
        '/target/.babelrc': babelFxt.current,
        '/target/.npmignore': npmignoreFxt.current,
        '/target/.gitignore': gitignoreFxt.current,
        '/target/package.json': packageFxt.current,
        '/target/node_modules/awesome-config/configs/.eslintrc': eslintFxt.upcoming,
        '/target/node_modules/awesome-config/configs/.editorconfig': 'bar',
        '/target/node_modules/awesome-config/configs/.babelrc': babelFxt.upcoming,
        '/target/node_modules/awesome-config/configs/.npmignore': npmignoreFxt.upcoming,
        '/target/node_modules/awesome-config/configs/.gitignore': gitignoreFxt.upcoming,
        '/target/node_modules/awesome-config/configs/package.json': packageFxt.upcoming,
        '/target/node_modules/awesome-config/package.json': JSON.stringify({
          name: 'awesome-config',
          version: '1.0.0',
        }),
      }

      vol.fromJSON(dir, '/')

      await sharec(context)
    })

    it('installs configs', async () => {
      expect(vol.readFileSync('/target/.eslintrc', 'utf8')).toMatchFxt(eslintFxt.result)
      expect(vol.readFileSync('/target/.babelrc', 'utf8')).toMatchFxt(babelFxt.result)
      expect(vol.readFileSync('/target/.editorconfig', 'utf8')).toMatchFxt('bar\n')
      expect(vol.readFileSync('/target/.gitignore', 'utf8')).toMatchFxt(gitignoreFxt.result)
      expect(vol.readFileSync('/target/.npmignore', 'utf8')).toMatchFxt(npmignoreFxt.result)
      expect(vol.readFileSync('/target/package.json', 'utf8')).toMatchFxt(packageFxt.result)
    })

    it("doesn't write cache to `node_modules`", () => {
      expect(vol.readdirSync('/target/node_modules')).not.toContain('.cache')
    })

    it("doesn't write cache to `.sharec`", () => {
      expect(vol.readdirSync('/target')).not.toContain('.sharec')
    })
  })

  describe('with cache', () => {
    const context = {
      targetPath: '/target',
      cache: {},
      configs: [],
      options: {
        cache: true,
      },
    }

    beforeEach(async () => {
      const dir = {
        '/target/.eslintrc': eslintFxt.current,
        '/target/.babelrc': babelFxt.current,
        '/target/.npmignore': npmignoreFxt.current,
        '/target/.gitignore': gitignoreFxt.current,
        '/target/package.json': packageFxt.current,
        '/target/node_modules/awesome-config/configs/.eslintrc': eslintFxt.upcoming,
        '/target/node_modules/awesome-config/configs/.editorconfig': 'bar',
        '/target/node_modules/awesome-config/configs/.babelrc': babelFxt.upcoming,
        '/target/node_modules/awesome-config/configs/.npmignore': npmignoreFxt.upcoming,
        '/target/node_modules/awesome-config/configs/.gitignore': gitignoreFxt.upcoming,
        '/target/node_modules/awesome-config/package.json': JSON.stringify({
          name: 'awesome-config',
          version: '1.0.0',
        }),
        '/target/node_modules/awesome-config/configs/package.json': packageFxt.upcoming,
      }

      vol.fromJSON(dir, '/')

      await sharec(context)
    })

    it('installs configs', async () => {
      expect(vol.readFileSync('/target/.eslintrc', 'utf8')).toMatchFxt(eslintFxt.result)
      expect(vol.readFileSync('/target/.babelrc', 'utf8')).toMatchFxt(babelFxt.result)
      expect(vol.readFileSync('/target/.editorconfig', 'utf8')).toMatchFxt('bar\n')
      expect(vol.readFileSync('/target/.gitignore', 'utf8')).toMatchFxt(gitignoreFxt.result)
      expect(vol.readFileSync('/target/.npmignore', 'utf8')).toMatchFxt(npmignoreFxt.result)
      expect(vol.readFileSync('/target/package.json', 'utf8')).toMatchFxt(packageFxt.result)
    })

    it('writes cache to `node_modules`', () => {
      expect(vol.readdirSync('/target/node_modules/.cache/sharec')).toHaveLength(6)
    })

    it("doesn't write cache to `.sharec`", () => {
      expect(vol.readdirSync('/target')).not.toContain('.sharec')
    })
  })

  describe('with included cache', () => {
    const context = {
      targetPath: '/target',
      cache: {},
      configs: [],
      options: {
        cache: 'include',
      },
    }

    beforeEach(async () => {
      const dir = {
        '/target/.eslintrc': eslintFxt.current,
        '/target/.babelrc': babelFxt.current,
        '/target/.npmignore': npmignoreFxt.current,
        '/target/.gitignore': gitignoreFxt.current,
        '/target/package.json': packageFxt.current,
        '/target/node_modules/awesome-config/configs/.eslintrc': eslintFxt.upcoming,
        '/target/node_modules/awesome-config/configs/.editorconfig': 'bar',
        '/target/node_modules/awesome-config/configs/.babelrc': babelFxt.upcoming,
        '/target/node_modules/awesome-config/configs/.npmignore': npmignoreFxt.upcoming,
        '/target/node_modules/awesome-config/configs/.gitignore': gitignoreFxt.upcoming,
        '/target/node_modules/awesome-config/package.json': JSON.stringify({
          name: 'awesome-config',
          version: '1.0.0',
        }),
        '/target/node_modules/awesome-config/configs/package.json': packageFxt.upcoming,
      }

      vol.fromJSON(dir, '/')

      await sharec(context)
    })

    it('installs configs', async () => {
      expect(vol.readFileSync('/target/.eslintrc', 'utf8')).toMatchFxt(eslintFxt.result)
      expect(vol.readFileSync('/target/.babelrc', 'utf8')).toMatchFxt(babelFxt.result)
      expect(vol.readFileSync('/target/.editorconfig', 'utf8')).toMatchFxt('bar\n')
      expect(vol.readFileSync('/target/.gitignore', 'utf8')).toMatchFxt(gitignoreFxt.result)
      expect(vol.readFileSync('/target/.npmignore', 'utf8')).toMatchFxt(npmignoreFxt.result)
      expect(vol.readFileSync('/target/package.json', 'utf8')).toMatchFxt(packageFxt.result)
    })

    it('writes cache to `.sharec`', () => {
      expect(vol.readdirSync('/target/.sharec/cache')).toHaveLength(6)
    })

    it("doesn't write cache to `node_modules`", () => {
      expect(vol.readdirSync('/target/node_modules')).not.toContain('.cache')
    })
  })
})
