# SYNOPSIS
get multiple keys leveldb

# USAGE
```js
var mget = require('level-mget');
mget(db, ['foo', 'bar'], function(err, values) {
  console.log(values); // { foo: /* ... */, bar: /* ... */ }
});
```

