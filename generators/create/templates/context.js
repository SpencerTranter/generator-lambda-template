const colors  = require('colors');//eslint-disable-line

module.exports = function (config) {

  return {
    local_config: config,
    functionName: 'stackdriver-stage',

    succeed(msg) {

      msg = (typeof msg === 'undefined') ? 'SUCCESS' : `SUCCESS: ${msg}`;
      console.log(msg.green);
      process.exit();

    },
    fail(msg) {

      msg = (typeof msg === 'undefined') ? 'FAIL' : `FAIL: ${msg}`;
      console.log(msg.red);
      process.exit();

    },
    done(msg) {

      msg = (typeof msg === 'undefined') ? 'DONE' : `DONE: ${msg}`;
      console.log(msg.blue);
      process.exit();

    },
    getRemainingTimeInMillis() {

      var currentTime = new Date();
      return (config.timeout * 1000) - (currentTime - config.start_datetime);

    }

  };

};
