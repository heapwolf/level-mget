# SYNOPSIS
get multiple keys leveldb, returns a `Map` of errors and values.

# USAGE
```js
const mget = require('level-mget')
```

```js
mget(db, ['foo', 'bar'], function(errors, values) {
  errors // => Map()
  values // => Map()
});
```

```js
const [errors, values] = await mget(['foo', 'bar'])
errors // => Map()
values // => Map()
```

