# SYNOPSIS
get multiple keys leveldb, returns a `Map` of errors and values.

# USAGE
```js
var mget = require('level-mget');
mget(db, ['foo', 'bar'], function(err, values) {
  err // => Map()
  values // => Map()
});
```

