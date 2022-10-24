/**
 * @module util/getProductionDataFiles
 * @version 1.0.0
 */

'use strict'

const fg = require('fast-glob')
const path = require('path')

/**
 * Get Meta Data Files exported from Production
 * @param {string} dataDir Absolute Path of Data Directory
 * @returns {object} Collection of Files
 */
module.exports = (dataDir) => {
  const custom = path.join(dataDir, 'custom-objecttype-definitions.xml')
  const system = path.join(dataDir, 'system-objecttype-extensions.xml')

  return fg.sync([custom, system], {
    dot: false,
    stats: true,
    ignore: [],
  })
}
