const isObject = require('lodash/isObject')
const { compose, fork } = require('../../actions')
const { hashAtom, listConcatAtom, primitiveAtom } = require('../../atoms')
const { eslintJson } = require('../eslint/schema')
const { babelJson } = require('../babel/schema')
const { postcssJson } = require('../postcss/schema')
const { lintStagedJson } = require('../lintStaged/schema')
const { yaspellerJson } = require('../yaspeller/schema')
const { huskyJson } = require('../husky/schema')
const { jestJson } = require('../jest/schema')

const packageJson = compose({
  // Default fields
  keywords: listConcatAtom,
  homepage: primitiveAtom,
  bugs: fork([[isObject, hashAtom], primitiveAtom]),
  license: fork([[isObject, hashAtom], primitiveAtom]),
  author: fork([[isObject, hashAtom], primitiveAtom]),
  repository: fork([[isObject, hashAtom], primitiveAtom]),
  scripts: hashAtom,
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

  // Handle other fields
  $$ignore: [
    'sharec',
    'name',
    'version',
    'description',
    'homepage',
    'bugs',
    'people',
    'man',
    'repository',
    'os',
    'cpu',
    'preferGlobal',
    'private',
  ],
  $$default: fork([[isObject, hashAtom], primitiveAtom]),
})

module.exports = {
  packageJson,
}
