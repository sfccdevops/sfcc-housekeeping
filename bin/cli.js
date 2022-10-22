#!/usr/bin/env node

'use strict'

const chalk = require('chalk')
const debug = require('debug')('cli')
const path = require('path')
const yargs = require('yargs')

const cli = yargs
  .scriptName('./bin/cli.js')
  .usage(`\n${chalk.cyan.bold('Usage:')} ${chalk.bold.green('./bin/cli.js')} <command> ${chalk.dim('--options')}`)
  .command('*', 'Dead Code Detector')
  .command('pref', 'Site Preference Audit', {
    'data-dir': {
      alias: 'd',
      describe: 'Absolute Path to Data Directory',
      type: 'string',
    },
  })
  .example('./bin/cli.js', 'Dead Code Detector')
  .example('./bin/cli.js pref --data-dir=/path/to/data', 'Site Preference Audit')
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
  .epilogue(`${chalk.bold.cyan('NEED MORE HELP ?')} https://bit.ly/sfcc-dcd-help`)
  .wrap(85)
  .strict()
  .version(false).argv

const command = cli._[0] || 'dcd'

try {
  debug(`Executing ${command}`)
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
