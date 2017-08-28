const isLambda        = require('is-lambda');

exports.handler = function (_event, _context, callback) {

  const env     = (isLambda) ? _context.functionName.split('-')[1] : 'stage';
  const event   = 'Foo';

  console.log(`Environment is ${env}.`);

  return new Promise((resolve) => {

    if (event !== 'Foo') throw new Error('ERROR1');
    else resolve(`${event}Bar`);

  })
  // Async
  .then(data => new Promise((resolve) => {

    if (data !== 'FooBar') throw new Error('ERROR2');
    else resolve(`${data}Bar`);

  }))
  // Sync
  .then((data) => {

    if (data !== 'FooBarBar') throw new Error('ERROR3');
    else return (`${data}Bar`);

  })
  .then(results => callback(null, results))
  .catch(err => callback(err));

};
