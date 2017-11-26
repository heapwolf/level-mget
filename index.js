module.exports = async function mget (db, keys, cb) {
  const values = new Map()
  const errors = new Map()

  if (!cb) {
    return {
      async then (next) {
        const values = new Map()
        const errors = new Map()
        keys = new Set(keys)

        for (let [, key] of keys.entries()) {
          try {
            values.set(key, await db.get(key))
          } catch (ex) {
            errors.set(key, ex)
          }
        }

        next([errors, values])
      }
    }
  }

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
