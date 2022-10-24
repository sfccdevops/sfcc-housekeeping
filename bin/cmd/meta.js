/**
 * Meta Data Analyzer
 * @module cmd/meta
 * @version 1.0.0
 */

'use strict'

const chalk = require('chalk')
const debug = require('debug')('cli:meta')
const fs = require('fs')

const {getCodeFiles, getSandboxDataFiles, getProductionDataFiles, getRoot} = require('../util')

module.exports = async (options) => {
  debug('Processing Meta Data ...')

  // Get Project Root
  const rootDir = getRoot()

  // Get Data Directories
  const dataDir = options.dataDir
  const prodDataDir = options.prodDataDir

  // Check that we got a config option for sandbox data directory
  if (!dataDir) {
    console.log(chalk.red.bold('\n✖ Missing required --data-dir attribute\n'))
    process.exit(1)
  }

  // Make sure sandbox data directory actually exists
  if (!fs.existsSync(dataDir)) {
    console.log(chalk.red.bold(`\n✖ Invalid Data Directory: ${dataDir}\n`))
    process.exit(1)
  }

  // Check that we got a config option for production data directory
  if (!prodDataDir) {
    console.log(chalk.red.bold('\n✖ Missing required --prod-dir attribute\n'))
    process.exit(1)
  }

  // Make sure production data directory actually exists
  if (!fs.existsSync(prodDataDir)) {
    console.log(chalk.red.bold(`\n✖ Invalid Data Directory: ${prodDataDir}\n`))
    process.exit(1)
  }

  debug(`Meta Data Analyzer: ${dataDir}`)
  debug(rootDir)

  // Get Project Source Code Files
  const codeFiles = getCodeFiles(rootDir)
  debug(codeFiles)

  // Get XML Files from Sandbox Data Folder
  const sandboxDataFiles = getSandboxDataFiles(dataDir)
  debug(sandboxDataFiles)

  // Get XML Files from Production Data Folder
  const prodDataFiles = getProductionDataFiles(prodDataDir)
  debug(prodDataFiles)
}
