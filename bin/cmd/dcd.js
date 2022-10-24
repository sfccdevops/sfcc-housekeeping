/**
 * Dead Code Detector
 * @module cmd/dcd
 * @version 1.0.0
 */

'use strict'

const chalk = require('chalk')
const debug = require('debug')('cli:dcd')
const fs = require('fs')

const {getCodeFiles, getLogFiles, getRoot} = require('../util')

module.exports = async (options) => {
  debug('Processing Dead Code ...')

  // Get Project Root
  const rootDir = getRoot()

  // Get Log Directory
  const logDir = options.logDir

  // If we could not find a config file, we need to exit
  if (!logDir) {
    console.log(chalk.red.bold('\n✖ Missing required --log-dir attribute\n'))
    process.exit(1)
  }

  // Make sure log directory actually exists
  if (!fs.existsSync(logDir)) {
    console.log(chalk.red.bold(`\n✖ Invalid Log Directory: ${logDir}\n`))
    process.exit(1)
  }

  debug(`Dead Code Detector: ${logDir}`)
  debug(rootDir)

  // Get Files
  const logFiles = getLogFiles(logDir)
  debug(logFiles)

  const codeFiles = getCodeFiles(rootDir)
  debug(codeFiles)
}
