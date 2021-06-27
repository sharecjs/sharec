// @ts-check

/**
 * @typedef {import('../').Input} Input
 */

/**
 * @param {Input} input
 * @returns {Promise<Input>}
 */
const insertEOL = async (input) => {
  const { mergedConfigs } = input

  for (const config in mergedConfigs) {
    const withEOL = /^\s*$/gm.test(mergedConfigs[config])

    if (withEOL) continue

    input.mergedConfigs[config] = mergedConfigs[config] + '\n'
  }

  return input
}

module.exports = insertEOL
