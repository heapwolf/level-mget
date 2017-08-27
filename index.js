module.exports = function mget (db, keys, cb) {
  const values = new Map()
  const errors = new Map()

  let todo = keys.length

  const done = () => cb(errors.size ? errors : null, values)

  keys.forEach(key => {
    db.get(key, (err, value) => {
      if (err) {
        errors.set(key, err)
        if (--todo) return
        return done()
      }

      values.set(key, value)

      if (!--todo) done()
    })
  })
}
