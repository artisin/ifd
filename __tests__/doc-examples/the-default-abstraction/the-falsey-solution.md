__The "falsey" Solution__
```js
const foo = ifd(0, 5, {
  // 0 is not false
  zero: true
});

// foo === 0
```
