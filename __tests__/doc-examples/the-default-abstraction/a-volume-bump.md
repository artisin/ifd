__A Volume Bump__
```js
// creates custom identity thunk
const isAnArrayOfTwo = ifd({
  identity: function (val) {
    return Array.isArray(val) && val.length === 2;
  }
});

const foo = isAnArrayOfTwo([1, 2, 3], 'te', [4, 5], [6, 7]);

//foo === [4, 5]
```
