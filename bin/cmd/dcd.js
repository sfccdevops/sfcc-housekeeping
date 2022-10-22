/**
 * Dead Code Detector
 */

const debug = require('debug')('cli:dcd')
const rootDir = require('../util/getRoot')()

module.exports = async () => {
  debug('Dead Code Detector')
  debug(rootDir)
}
