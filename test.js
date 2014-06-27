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
    });

    mget(db, ['foo', '0'], function(err, values) {
      assert(err);
    });

    errors = 0;
    function assert_fail(err, values) {
      assert(err);
      errors++;
      if (errors > 1) assert(false, 'too many errors');
    }

    mget(db, ['foo', 'bar'], assert_fail);
  });
});

