/**
 * @module util/getSandboxDataFiles
 * @version 1.0.0
 */

'use strict'

const fg = require('fast-glob')
const path = require('path')

/**
 * Get Meta Data Files from SFCC Project Data Repo or Site Export
 * @param {string} dataDir Absolute Path of Data Directory
 * @returns {object} Collection of Files
 */
module.exports = (dataDir) => {
  return fg.sync([path.join(dataDir, '**/*.xml')], {
    dot: false,
    stats: true,
    ignore: [],
  })
}
