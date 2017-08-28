const index     = require('./index.js');
const { merge } = require('lodash');
const argv      = require('minimist')(process.argv.slice(2)); //eslint-disable-line

var json;
var context;
// default settings. argv will override these.
var config = {
  start_datetime: new Date(),
  timeout: 10 // seconds
};

// override the default settings if not passed.
merge(config, argv);

context = require('./context')(config);
json    = require('./sample.json');

index.handler(json, context, (err, results) => {

  if (err) console.log(`callback executed w/ error: ${err}`);
  else    console.log(`callback executed w/ results: ${results}`);
  process.exit();

});
