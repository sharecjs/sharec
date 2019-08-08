jest.mock('utils/fs', () => {
  const slash = require('slash')
  const fs = require('memfs').promises

  return {
    readDir: fs.readdir,
    makeDir: fs.mkdir,
    readFile: fs.readFile,
    copyFile: fs.copyFile,
    writeFile: fs.writeFile,
    lstat: fs.lstat,
    removeFile: fs.unlink,
    // TODO: replace with actual function
    normalizePathSlashes: paths => paths.map(el => slash(el)),
  }
})
