var level = require('level');
var mget = require('./index');
var rimraf = require('rimraf');
var assert = require('assert');
var fs = require('fs');

try {
  fs.mkdirSync('./db');
} catch(ex) {}

rimraf('./db', function(err) {

  var db = level('./db');
  db.batch([
    { type: 'put', key: '0', value: 0 },
    { type: 'put', key: '1', value: 1 },
    { type: 'put', key: '2', value: 1 }
  ], function(err) {
    assert(!err);

    mget(db, ['0', '1', '2'], function(err, values) {
      assert(!err);
      assert(Object.keys(values).length == 3);
    })
  });
});
