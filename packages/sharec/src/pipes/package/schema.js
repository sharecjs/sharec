// @ts-check
const isMap = require('lodash/isMap')
const { compose, fork } = require('sharec-schema').actions
const { hashAtom, listConcatAtom, primitiveAtom, commandAtom } = require('sharec-schema').atoms
const { eslintJson } = require('../eslint/schema')
const { babelJson } = require('../babel/schema')
const { postcssJson } = require('../postcss/schema')
const { lintStagedJson } = require('../lintStaged/schema')
const { yaspellerJson } = require('../yaspeller/schema')
const { huskyJson } = require('../husky/schema')
const { jestJson } = require('../jest/schema')
const { prettierJson } = require('../prettier/schema')

const packageJson = compose({
  // Default fields
  keywords: listConcatAtom,
  homepage: primitiveAtom,
  bugs: fork([[isMap, hashAtom], primitiveAtom]),
  license: fork([[isMap, hashAtom], primitiveAtom]),
  author: fork([[isMap, hashAtom], primitiveAtom]),
  repository: fork([[isMap, hashAtom], primitiveAtom]),
  scripts: compose({
    $$default: commandAtom,
  }),
  config: hashAtom,
  engines: hashAtom,
  dependencies: hashAtom,
  devDependencies: hashAtom,
  peerDependencies: hashAtom,
  optionalDependencies: hashAtom,
  bundledDependencies: hashAtom,

  // Tools fields
  eslintConfig: eslintJson,
  eslintIgnore: listConcatAtom,
  babel: babelJson,
  postcss: postcssJson,
  browserslist: listConcatAtom,
  'lint-staged': lintStagedJson,
  yaspeller: yaspellerJson,
  husky: huskyJson,
  jest: jestJson,
  prettier: prettierJson,

  // Handle other fields
  $$ignore: ['sharec', 'name', 'version', 'description', 'people', 'man', 'os', 'cpu', 'preferGlobal', 'private'],
  $$default: fork([[isMap, hashAtom], primitiveAtom]),
})

module.exports = {
  packageJson,
}
