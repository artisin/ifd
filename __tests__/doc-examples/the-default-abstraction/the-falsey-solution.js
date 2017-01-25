const path = require('path');
const ifd  = require(path.join(process.cwd(), 'dist/ifd.js'));

const foo = ifd(0, 5, {
  // 0 is not false
  zero: true
});

module.exports = {
  exp: function (should) {
    should.equal(foo, 0);
  }
};
