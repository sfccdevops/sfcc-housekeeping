'use strict';

var logger = require('dw/system/Logger').getLogger('DevTools', 'DCD');

/**
 * Generate Stack Trace for Better Debugging
 * @returns {Object} trace
 */
function stackTrace () {
    var trace = {
        fileName: null,
        lineNumber: null,
        requestID: request.requestID,
        requestType: (request.httpParameterMap.format.stringValue === 'ajax') ? 'ajax' : 'http',
        requestURL: request.httpURL.toString(),
        stack: null,
        timestamp: new Date().getTime(),
        uid: 'id' + Math.random().toString(36).substring(9)
    };

    try {
        throw new Error('');
    } catch (error) {
        trace.stack = error.stack || null;
    }

    if (trace.stack) {
        trace.stack = trace.stack.split('\n').map(function (line) { return line.trim(); });
        trace.stack = trace.stack.splice(trace.stack[0] == 'Error' ? 3 : 2);
        trace.stack.pop();

        // Get First File from Stack
        var lastStack = trace.stack[0].split(' ')
        var fileDetails = lastStack[1];
        var lineNumber = fileDetails.split(':').pop()
        var fileName = fileDetails.replace(':' + lineNumber, '')

        trace.fileName = fileName;
        trace.lineNumber = parseInt(lineNumber);
        trace.ide = 'http://localhost:60606/target=/' + fileName;
    }

    return trace;
}

/**
 * Dead Code Detector Logger
 * Logs a message to the dcd log to let us know the code is not dead.
 *
 * @example: dw.system.HookMgr.callHook('sfcc.util.devtools', 'dcd', '2022-10-15', 'Peter Schmalfeldt', 'I think we killed this bit of code');
 *
 * @param {String} datePlaced YYYY-MM-DD the date that the dcd was added to the codebase
 * @param {String} author Name of the author who placed the dcd
 * @param {String} message Try to make this unique if possible so it can be easily found in the logs, a HashId would be best
 * @returns {boolean} always true
 */
function dcd (datePlaced, author, message) {
    var logMessage = [];
    var trace = stackTrace();

    // Start Log Message
    logMessage.push(
        'DEAD_CODE_CHECK | '
        + (!empty(datePlaced) ? datePlaced : '')
        + ' | '
        + (!empty(author) ? author : '')
        + ' | '
        + (!empty(message) ? message : '')
    );

    // Add Request URL if we have it
    if (request) {
        logMessage.push('REQUEST_URL | ' + request.getHttpURL());
    }

    // Add the stack trace
    if (trace) {
        logMessage.push('STACK_TRACE | ' + JSON.stringify(trace));
    }

    // Write Log Message
    logger.debug(logMessage.join('\n'));
    return true;
};

exports.dcd = dcd;
