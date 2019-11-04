const { fixtures } = require('testUtils')
const { vol } = require('memfs')
const sharec = require('../../')

describe('sharec > remove', () => {
  const packageJsonBaseRemoveFxt = fixtures(
    'package/json/04-base-remove',
    'json',
  )
  const babelListedValuesFxt = fixtures('babel/json/04-listed-values', 'json')
  const eslintParserOptionsOperationsFxtYaml = fixtures(
    'eslint/yaml/02-parser-options-operations',
  )
  const targetProcess = {
    argv: [null, null, 'remove'],
    env: {
      PWD: '/configuration-package',
      INIT_CWD: '/target',
    },
  }

  beforeEach(() => {
    vol.reset()
  })

  it('should remove configuration from target project', async () => {
    expect.assertions(4)

    const dir = {
      '/target/package.json': JSON.stringify(packageJsonBaseRemoveFxt.result),
      '/target/.eslintrc.yml': eslintParserOptionsOperationsFxtYaml.result,
      '/target/.babelrc': JSON.stringify(babelListedValuesFxt.result),
      '/configuration-package/configs/package.json': JSON.stringify(
        packageJsonBaseRemoveFxt.upcoming,
      ),
      '/configuration-package/package-lock.json': 'foo',
      '/configuration-package/configs/.eslintrc.yml':
        eslintParserOptionsOperationsFxtYaml.upcoming,
      '/configuration-package/configs/.babelrc': JSON.stringify(
        babelListedValuesFxt.upcoming,
      ),
    }
    vol.fromJSON(dir)

    await sharec(targetProcess)

    expect(vol.readFileSync('/target/.eslintrc.yml', 'utf8')).toWraplessEqual(
      eslintParserOptionsOperationsFxtYaml.restored,
    )
    expect(JSON.parse(vol.readFileSync('/target/.babelrc'))).toEqual(
      babelListedValuesFxt.restored,
    )
    expect(JSON.parse(vol.readFileSync('/target/package.json'))).toEqual(
      packageJsonBaseRemoveFxt.restored,
    )
    expect(vol.readdirSync('/target')).not.toContain('package-lock.json')
  })
})
