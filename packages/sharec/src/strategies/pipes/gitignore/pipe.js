const { map } = require('../../actions')
const { linesConcatAtom } = require('../../atoms')

const gitignorePipe = map(['.gitignore', linesConcatAtom])

module.exports = gitignorePipe
