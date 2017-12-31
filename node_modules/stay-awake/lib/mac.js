var child_process = require('child_process');
var process = require('process');
var debug = require('debug')('stay-awake');

var noop = function() {};

var caffeine = null;
var sleepCount = 0;

module.exports = {};

module.exports.prevent = function(cb) {
    var callback = cb || noop;
    if(caffeine) {
        sleepCount += 1;
        debug('Preventing sleep. SleepCount=%d', sleepCount);
        return process.nextTick(function() {
            callback(null, sleepCount);
        });
    }

    debug('Spawning caffeinate');
    caffeine = child_process.spawn('caffeinate', ['-w ' + process.pid]);
    caffeine.on('error', function(err) {
        debug('Error in caffeinate. Computer can now sleep automatically.', err);
        callback(err, sleepCount);
        callback = noop;
        caffeine = null;
        sleepCount = 0;
    });

    caffeine.on('exit', function(code) {
        debug('Caffeinate has exited with return code=%d', code);
        sleepCount = 0;
        caffeine = null;
    });

    if(caffeine.pid) {
        debug('Caffeinate has started with pid=%d', caffeine.pid);
        sleepCount += 1;
        process.nextTick(function() {
            callback(null, sleepCount);
            callback = noop;
        });
    }
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

    if(caffeine && sleepCount === 0) {
        debug('Allowing auto sleep by killing caffeinate.');
        caffeine.kill();
        caffeine = null;
    }

    debug('`allow` called. SleepCount=%d', sleepCount);
    process.nextTick(function() {
        callback(null, sleepCount);
    });
};
