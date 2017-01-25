__The Nested Ternary Problem__
```js
const one   = false;
const two   = false;
const three = true;

// while this gives us the desired outcome the
// logic is hard to reason about
const foo = one ? 1 : two ? 2 : three ? 3 : 4;
// foo === 3
```
