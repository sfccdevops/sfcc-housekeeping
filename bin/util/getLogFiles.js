/**
 * @module util/getLogFiles
 * @version 1.0.0
 */

'use strict'

const fg = require('fast-glob')
const path = require('path')

/**
 * Get Log Files from SFCC Project
 * @param {string} logDir Absolute Path of Log Directory
 * @returns {object} Collection of Files
 */
module.exports = (logDir) => {
  return fg.sync([path.join(logDir, '**')], {
    dot: false,
    stats: true,
    ignore: [],
  })
}
