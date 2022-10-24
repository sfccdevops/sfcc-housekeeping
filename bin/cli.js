#!/usr/bin/env node

'use strict'

// Import Environment Config from .env
require('dotenv').config()

const chalk = require('chalk')
const path = require('path')
const yargs = require('yargs')

const cli = yargs
  .scriptName('./bin/cli.js')
  .usage(`\n${chalk.cyan.bold('Usage:')} ${chalk.bold.green('./bin/cli.js')} <command> ${chalk.dim('--options')}`)
  .example('./bin/cli.js dcd --log-dir=/path/to/logs', 'Dead Code Detector')
  .command('dcd', 'Dead Code Detector', {
    'log-dir': {
      alias: 'o',
      describe: 'Absolute Path to Log Directory',
      type: 'string',
      default: process.env.SFCC_LOG_DIR,
    },
  })
  .example('./bin/cli.js pref --data-dir=/path/to/data', 'Meta Data Analyzer')
  .command('meta', 'Meta Data Analyzer', {
    'data-dir': {
      alias: 'd',
      describe: 'Absolute Path to Data Directory',
      type: 'string',
      default: process.env.SFCC_DATA_DIR,
    },
    'prod-dir': {
      alias: 'p',
      describe: 'Absolute Path to Production Data Directory',
      type: 'string',
      default: process.env.SFCC_PROD_DATA_DIR,
    },
  })
  .updateStrings({
    'Commands:': chalk.cyan('Commands:\n'),
    'Options:': chalk.cyan('Options:\n'),
    'Examples:': chalk.cyan('Examples:\n'),
  })
  .fail((msg, err, yargs) => {
    yargs.showHelp()
    console.log(`\n${chalk.bold.red('✖ ERROR:')} ${msg}\n`)
    process.exitCode = 1
  })
  .help('help')
  .alias('help', 'h')
  .epilogue(`${chalk.bold.cyan('NEED MORE HELP ?')} https://bit.ly/sfcc-housekeeping`)
  .wrap(85)
  .demand(1)
  .strict()
  .version(false).argv

const command = cli._[0]

try {
  require(path.join(__dirname, 'cmd', `${command}.js`))(cli)
} catch (err) {
  if (err.code === 'MODULE_NOT_FOUND') {
    if (command) {
      console.log(chalk.red.bold(`\n✖ Command '${command}' not recognized\n`))
    }
    console.log('Use ' + chalk.cyan('./bin/cli.js help') + ' for a list of commands\n')
  } else {
    throw err
  }
}

module.exports = cli
