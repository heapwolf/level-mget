module.exports = function mget(db, keys, cb) {

  var values = {};
  var error;
  var todo = keys.length;

  for (var i = 0; i < keys.length; i++) (function(key){

    db.get(key, function(err, value){
      if (err) {
        return error = err;
      }

      values[key] = value;

      if (!--todo) {
        if (error) return cb(err);
        cb(null, values);
      }
    });
  }(keys[i]));
};

