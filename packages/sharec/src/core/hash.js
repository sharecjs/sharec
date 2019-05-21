const lzString = require('lz-string')

const createHashFromObject = obj => {
  return lzString.compress(JSON.stringify(obj))
}

const createObjectFromHash = hash => {
  return JSON.parse(lzString.decompress(hash))
}

module.exports = {
  createHashFromObject,
  createObjectFromHash,
}
