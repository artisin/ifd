const path = require('path');
const ifd  = require(path.join(process.cwd(), 'dist/ifd.js'));

// creates custom identity thunk
const isAnArrayOfTwo = ifd({
  // if isAnArryOfTwo does not met identity
  // then we want to return false as the default value
  default: false,
  identity: function (val) {
    return Array.isArray(val) && val.length === 2;
  }
});


// lazy evaluation of arguments
const foo = ifd(
  [[isAnArrayOfTwo, false, true, 0, [2]], 'Not Me!'],
  [[isAnArrayOfTwo, [2, 3, 4], false, 'not-an-array'], 'Or Me Either!'],
  // [1, 2] === truthy -> <return>
  [[isAnArrayOfTwo, undefined, [1, 2], null, [2]], 'Pick Me, And Return This String'],
  [[isAnArrayOfTwo, null, []], 'will not be evaluated']
);

module.exports = {
  exp: function (should) {
    should.equal(foo, 'Pick Me, And Return This String');
  }
};
