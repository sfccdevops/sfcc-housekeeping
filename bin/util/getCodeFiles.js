/**
 * @module util/getCodeFiles
 * @version 1.0.0
 */

'use strict'

const fg = require('fast-glob')
const path = require('path')

/**
 * Get Code Files from SFCC Project
 * @param {string} codeDir Absolute Path of Code Directory
 * @returns {object} Collection of Files
 */
module.exports = (codeDir) => {
  return fg.sync([path.join(codeDir, '**')], {
    dot: false,
    stats: true,
    ignore: ['**/data/**', '**/node_modules/**', '**.zip', '**.map', '**.jpg', '**.png', '**.gif'],
  })
}
