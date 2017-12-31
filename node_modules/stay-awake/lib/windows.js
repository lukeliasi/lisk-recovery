var stayAwake = require('../build/Release/stay_awake');
var process = require('process');
var debug = require('debug')('stay-awake');

var noop = function() {};

var sleepCount = 0;

module.exports = {};

module.exports.prevent = function(cb) {
    var callback = cb || noop;

    if(sleepCount > 0) {
        sleepCount += 1;
        debug('Preventing sleep. SleepCount=%d', sleepCount);
        return process.nextTick(function() {
            callback(null, sleepCount);
        });
    }

    var code = stayAwake.start();
    debug('Previous ThreadExecutionState=%d', code);
    if(code == 0 || code === null) {
        debug('Error in setting thread execution state.');
        return process.nextTick(function() {
            callback(new Error('Could not enter sleep'), sleepCount);
        });
    }

    sleepCount += 1;

    process.nextTick(function() {
        callback(null, sleepCount);
    });
};

module.exports.allow = function(cb) {
    var callback = cb || noop;

    if(sleepCount === 0) {
        debug('`allow` called when Sleep count is 0.');
        return process.nextTick(function() {
            callback(null, sleepCount);
        });
    }

    sleepCount = sleepCount - 1;

    if(sleepCount === 0) {
        debug('Allowing auto sleep.');
        var code = stayAwake.stop();
        if(code === 0 || code === null) {
            debug('Could not allow sleep');
            sleepCount += 1;
            return process.nextTick(function() {
                callback(new Error('Could not allow sleep'), sleepCount);
            });
        }
    }

    debug('`allow` called. SleepCount=%d', sleepCount);
    process.nextTick(function() {
        callback(null, sleepCount);
    });
};