const { createFakeSpinner, createFakePrompt } = require('testUtils')
const insertMeta = require('../insertMeta')

describe('steps > insertMeta', () => {
  let spinner
  let prompt

  beforeEach(() => {
    spinner = createFakeSpinner()
    prompt = createFakePrompt()
  })

  it('should insert meta to target package.json', async () => {
    const targetPackage = {}
    const upcomingPackage = {
      name: 'awesome-config',
      version: '0.0.0',
    }
    const input = {
      targetPath: '/target',
      options: {},
      mergedConfigs: {
        '/target/package.json': JSON.stringify(targetPackage, null, 2),
      },
      upcomingPackage,
    }
    const output = await insertMeta({ spinner, prompt })(input)

    expect(JSON.parse(output.mergedConfigs['/target/package.json'])).toEqual({
      sharec: {
        config: upcomingPackage.name,
        version: upcomingPackage.version,
      },
    })
  })

  it('should not insert meta to target package.json if disappear option is given', async () => {
    const targetPackage = {}
    const upcomingPackage = {
      name: 'awesome-config',
      version: '0.0.0',
    }
    const input = {
      targetPath: '/target',
      options: {
        disappear: true,
      },
      mergedConfigs: {
        '/target/package.json': JSON.stringify(targetPackage, null, 2),
      },
      upcomingPackage,
    }
    const output = await insertMeta({ spinner, prompt })(input)

    expect(JSON.parse(output.mergedConfigs['/target/package.json'])).toEqual({})
  })

  it('should take target package from input if it not exists in merged configs', async () => {
    const targetPackage = {}
    const upcomingPackage = {
      name: 'awesome-config',
      version: '0.0.0',
    }
    const input = {
      targetPath: '/target',
      targetPackage,
      mergedConfigs: {},
      options: {},
      upcomingPackage,
    }
    const output = await insertMeta({ spinner, prompt })(input)

    expect(JSON.parse(output.mergedConfigs['/target/package.json'])).toEqual({
      sharec: {
        config: upcomingPackage.name,
        version: upcomingPackage.version,
      },
    })
  })
})
