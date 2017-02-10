module.exports = function mget (db, keys, cb) {
  var values = new Map();
  var error;
  var todo = keys.length;

  keys.forEach(function (key) {
    db.get(key, function (err, value) {
      error = error || err;
      if (error) {
        if (--todo) return;
        return cb(error);
      }

      values.set(key, value);

      if (!--todo) {
        cb(null, values);
      }
    });
  });
};
