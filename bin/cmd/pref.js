/**
 * Site Preference Audit
 * @module cmd/pref
 * @version 1.0.0
 */

'use strict'

const chalk = require('chalk')
const debug = require('debug')('cli:pref')
const fs = require('fs')
const rootDir = require('../util/getRoot')()

module.exports = async (options) => {
  const dataDir = options.dataDir

  // If we could not find a config file, we need to exit
  if (!dataDir) {
    console.log(chalk.red.bold('\n✖ Missing required --data-dir attribute\n'))
    process.exit(1)
  }

  // Make sure data directory actually exists
  if (!fs.existsSync(dataDir)) {
    console.log(chalk.red.bold(`\n✖ Invalid Data Directory: ${dataDir}\n`))
    process.exit(1)
  }

  debug(`Site Preference Audit: ${dataDir}`)
  debug(rootDir)
}
