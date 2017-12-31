# node-stay-awake
Node module which prevents computer from going into automatic sleep. Currently supports windows and mac osx.

## Installation
```shell
npm install stay-awake
```

## Usage
```javascript
var stayAwake = require('stay-awake');

// do something not so important

// prevent auto sleep
stayAwake.prevent(function(err, data) {
    // handle error
    console.log('%d routines are preventing sleep', data);
});

// do something which needs the computer to stay awake

// do something async
doAsync(function() {
    // do something
    stayAwake.prevent(function() {}); // second call
    // do long processing
    stayAwake.allow(function() {}); // this subroutine no longer needs to prevent sleep
});

// once done allow the computer to sleep as configured in power management
stayAwake.allow(function(err, data) {
    if(data == 0) {
        console.log('Will sleep automatically');
    }
}); // allow

```