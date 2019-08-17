jest.mock('utils/fs', () => {
  const fsUtils = require.requireActual('./src/utils/fs')
  const fs = require('memfs').promises

  return {
    readDir: fs.readdir,
    makeDir: fs.mkdir,
    readFile: fs.readFile,
    copyFile: fs.copyFile,
    writeFile: fs.writeFile,
    lstat: fs.lstat,
    removeFile: fs.unlink,
    normalizePathSlashes: fsUtils.normalizePathSlashes,
    // TODO: find more clean way
    safeMakeDir: jest.fn().mockImplementation(async path => {
      try {
        await fs.mkdir(path, {
          recursive: true,
        })
      } catch (err) {}
    }),
  }
})
