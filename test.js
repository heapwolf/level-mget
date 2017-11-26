const level = require('level')
const mget = require('./index')
const rimraf = require('rimraf')
const assert = require('assert')
const bytewise = require('bytewise')

rimraf('./db', function (err) {
  assert(!err)
  var db = level('./db')
  db.batch([
    { type: 'put', key: '0', value: 0 },
    { type: 'put', key: '1', value: 1 },
    { type: 'put', key: '2', value: 1 }
  ], function (err) {
    assert(!err)

    mget(db, ['0', '1', '2'], function (err, values) {
      assert(!err)
      assert.equal(values.size, 3)
    })

    mget(db, ['foo', '0'], function (err, values) {
      assert(err)
    })

    let errors = 0
    function assertFail (err, values) {
      assert(err)
      errors++
      if (errors > 1) assert(false, 'too many errors')
    }

    mget(db, ['foo', 'bar'], assertFail)
  })
})

rimraf('./db2', function (err) {
  assert(!err)

  var db = level('./db2', {
    keyEncoding: bytewise
  })
  db.batch([
    { type: 'put', key: ['foo', 0], value: 0 },
    { type: 'put', key: ['foo', 1], value: 1 }
  ], function (err) {
    assert(!err)

    var k1 = ['foo', 0]
    var k2 = ['foo', 1]
    mget(db, [k1, k2], function (err, values) {
      assert(!err)
      assert.equal(values.size, 2)
      assert.equal(values.get(k1), 0)
      assert.equal(values.get(k2), 1)
    })
  })
})

rimraf('./db3', function (err) {
  assert(!err)

  var db = level('./db3', {
    keyEncoding: bytewise
  })
  db.batch([
    { type: 'put', key: ['foo', 0], value: 0 },
    { type: 'put', key: ['foo', 1], value: 1 }
  ], async function (err) {
    assert(!err)

    var k1 = ['foo', 0]
    var k2 = ['foo', 1]
    var k3 = ['foo', 2]

    const [errors, values] = await mget(db, [k1, k2, k3])
    assert.equal(values.size, 2)
    assert.equal(values.get(k1), 0)
    assert.equal(values.get(k2), 1)
    assert.equal(errors.size, 1)
    assert.ok(errors.get(k3) instanceof Error)
  })
})
