const { fixtures } = require('testUtils')
const { vol } = require('memfs')
const remove = require('../remove')

describe('tasks > remove >', () => {
  const packageJsonBaseRemoveFxt = fixtures('package/04-base-remove', 'json')
  const babelListedValuesFxt = fixtures('babel/json/04-listed-values', 'json')
  const eslintParserOptionsOperationsFxt = fixtures(
    'eslint/json/02-parser-options-operations',
    'json',
  )
  const eslintParserOptionsOperationsFxtYaml = fixtures(
    'eslint/yaml/02-parser-options-operations',
  )

  beforeEach(() => {
    vol.reset()
  })

  it('should remove configuration from the target project and delete all empty', async () => {
    expect.assertions(3)

    const packageJson = {
      sharec: {
        injected: true,
      },
    }
    const dir = {
      '/target/package.json': JSON.stringify(packageJson),
      '/target/.eslintrc': JSON.stringify(
        eslintParserOptionsOperationsFxt.result,
      ),
      '/target/.babelrc': JSON.stringify(babelListedValuesFxt.result),
      '/configuration-package/configs/.eslintrc': JSON.stringify(
        eslintParserOptionsOperationsFxt.new,
      ),
      '/configuration-package/configs/.babelrc': JSON.stringify(
        babelListedValuesFxt.new,
      ),
    }
    vol.fromJSON(dir)

    await remove({
      targetPath: '/target',
      configsPath: '/configuration-package',
    })

    expect(
      JSON.parse(vol.readFileSync('/target/package.json')),
    ).toMatchSnapshot()
    expect(JSON.parse(vol.readFileSync('/target/.eslintrc', 'utf8'))).toEqual(
      eslintParserOptionsOperationsFxt.restored,
    )
    expect(JSON.parse(vol.readFileSync('/target/.babelrc'))).toEqual(
      babelListedValuesFxt.restored,
    )
  })

  it('should remove configuration from package.json in the target project', async () => {
    expect.assertions(1)

    const dir = {
      '/target/package.json': JSON.stringify(packageJsonBaseRemoveFxt.result),
      '/configuration-package/configs/package.json': JSON.stringify(
        packageJsonBaseRemoveFxt.new,
      ),
    }
    vol.fromJSON(dir)

    await remove({
      targetPath: '/target',
      configsPath: '/configuration-package',
    })

    expect(
      JSON.parse(vol.readFileSync('/target/package.json')),
    ).toMatchSnapshot()
  })

  it('should remove configuration from all files in the target project', async () => {
    expect.assertions(3)

    const dir = {
      '/target/package.json': JSON.stringify(packageJsonBaseRemoveFxt.result),
      '/target/.eslintrc.yml': eslintParserOptionsOperationsFxtYaml.result,
      '/target/.babelrc': JSON.stringify(babelListedValuesFxt.result),
      '/configuration-package/configs/package.json': JSON.stringify(
        packageJsonBaseRemoveFxt.new,
      ),
      '/configuration-package/configs/.eslintrc.yml':
        eslintParserOptionsOperationsFxtYaml.new,
      '/configuration-package/configs/.babelrc': JSON.stringify(
        babelListedValuesFxt.new,
      ),
    }
    vol.fromJSON(dir)

    await remove({
      targetPath: '/target',
      configsPath: '/configuration-package',
    })

    expect(vol.readFileSync('/target/.eslintrc.yml', 'utf8')).toEqual(
      eslintParserOptionsOperationsFxtYaml.restored,
    )
    expect(JSON.parse(vol.readFileSync('/target/.babelrc'))).toEqual(
      babelListedValuesFxt.restored,
    )
    expect(JSON.parse(vol.readFileSync('/target/package.json'))).toEqual(
      packageJsonBaseRemoveFxt.restored,
    )
  })

  it('should throw an error if configuration package was not found', async () => {
    expect.assertions(1)

    const dir = {
      '/target/package.json': JSON.stringify(
        {
          sharec: {
            injected: true,
          },
        },
        null,
        2,
      ),
    }
    vol.fromJSON(dir, '/')

    try {
      await remove({
        targetPath: '/target',
        configsPath: '/configuration-package',
      })
    } catch (err) {
      expect(err.message).toContain('ENOENT')
    }
  })
})
