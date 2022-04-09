jest.mock('sharec-utils/lib/std', () => {
  const fs = require('memfs').promises

  return {
    readdir: fs.readdir,
    makedir: fs.mkdir,
    readFile: fs.readFile,
    copyFile: fs.copyFile,
    writeFile: fs.writeFile,
    lstat: fs.lstat,
    stat: fs.stat,
    removeFile: fs.unlink,
  }
})
