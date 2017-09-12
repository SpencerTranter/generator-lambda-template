const index     = require('./index.js');
const argv      = require('minimist')(process.argv.slice(2)); //eslint-disable-line
const AWS       = require('aws-sdk');
const each      = require('promise-each');
const moment    = require('moment');

const args          = process.argv.slice(2);
const count         = args[0] ? args[0] : 1;
const env           = args[1] === 'prod' ? args[1] : 'stage';
const bucket        = env === 'prod' ? process.env.ALL_META_PROD : process.env.ALL_META_STAGE;
const awsConfig     = {
  accessKeyId: process.env.AWS_ACESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
};
// default settings. argv will override these.
const contextConfig = {
  start_datetime: new Date(),
  timeout: 10 // seconds
};

var context = require('./context')(contextConfig);

AWS.config.update(awsConfig);

const s3            = new AWS.S3();
const listParams    = { Bucket: bucket, MaxKeys: count, Delimiter: '/', Prefix: 'gtwy_stamp/' };

new Promise((resolve) => {

  s3.listObjectsV2(listParams, (err, data) => {

    var macArr = [];

    if (err) throw new Error(err); // an error occurred
    else {

      data.CommonPrefixes.forEach(val => macArr.push(val.Prefix.split('/')[1]));
      resolve(macArr);

    }

  });

})
.then(each((mac) => {

  var now          = moment();
  var remainder    = 10 - (now.minute() % 10);
  var lastTen      = now.subtract((20 - remainder), 'minutes');
  var roundedStamp = lastTen.startOf('minute').unix();
  var getParams    = { Bucket: bucket, Key: `gtwy_stamp/${mac}/${roundedStamp}.json` };

  s3.getObject(getParams, (err, data) => {

    if (err) console.log(`ERROR failed to fetch gtwy_stamp/${mac}/${roundedStamp}.json`);
    else     {

      console.log(`Succefully fetched gtwy_stamp/${mac}/${roundedStamp}.json`);
      index.handler(JSON.parse(data.Body.toString()), context, (error, results) => {

        if (error) console.log(`callback executed w/ error: ${err}`);
        else {

          console.log(`callback executed w/ results: ${results}`);
          return `callback executed w/ results: ${results}`;

        }

      });

    }

  });

}))
.then(results => console.log('SUCCESS', results))
.catch(err => console.log('ERROR', err));
