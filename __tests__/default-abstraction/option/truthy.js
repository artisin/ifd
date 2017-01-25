const path  = require('path'),
      ifd  = require(path.join(process.cwd(), 'dist/ifd.js'));

const isAnArrayOfTwo = ifd({
  truthy: true,
  //create custom identity
  identity: function (val) {
    return Array.isArray(val) && val.length === 2;
  }
});

const testTrue = isAnArrayOfTwo([1], [2], [3, 4, 5], [3, 4], 'nope');
const testFalse = isAnArrayOfTwo([1], [2], [3, 4, 5], [2, 3, 4], true);


module.exports = {
  exp: function (should) {
    should.equal(testTrue, true);
    should.equal(testFalse, false);
  }
};
