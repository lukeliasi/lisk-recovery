var stayAwake = require('../index');

stayAwake.prevent(function(err) {
    if(err) {
        throw err;
    }
    stayAwake.allow();
});