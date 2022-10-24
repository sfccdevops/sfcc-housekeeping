/**
 * @module util/getRoot
 * @version 1.0.0
 */

'use strict'

const chalk = require('chalk')
const debug = require('debug')('cli:util')
const findUp = require('find-up').sync
const path = require('path')

/**
 * Get Root of SFCC Project
 * @returns {string} Absolute Path
 */
module.exports = () => {
  // Locate SFCC config file
  const dwJSON = findUp('dw.json')

  // If we could not find a config file, we need to exit
  if (!dwJSON) {
    console.log(chalk.red.bold(`\n✖ Could not fine dw.json file\n`))
    process.exit(1)
  }

  // Get the directory that contains the config file
  const rootDir = path.dirname(dwJSON)

  debug(`Found SFCC Root: ${rootDir}`)

  return rootDir
}
