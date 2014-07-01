module.exports = function mget(db, keys, cb) {

  var values = {};
  var error;
  var todo = keys.length;

  for (var i = 0; i < keys.length; i++) (function(key) {

    db.get(key, function(err, value) {
      error = err;

      if (error) {
        if (--todo) return;
        return cb(error);
      }

      values[key] = value;

      if (!--todo) {
        cb(null, values);
      }
    });
  }(keys[i]));
};

