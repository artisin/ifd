__"Ternary" Abstraction + "Default" Abstraction__
```js
const one   = false;
const two   = 'Kool';
const three = false;

const foo = ifd(
  [[ifd, false, null, one], 1],
  [[ifd, two, null], 2],
  [three, 3], {
    default: false
  }
);
// foo === 2

// Additionaly, you can use a placeholder
// to return the passing condition
const returnCondition = ifd(
  [[ifd, false, null, one], 1],
  //default placeholder = %p
  [[ifd, two, null], '%p'],
  [three, 3], {
    default: false
  }
);
// returnCondition === 'Kool'
```
