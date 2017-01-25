const path  = require('path'),
      ifd  = require(path.join(process.cwd(), 'dist/ifd.js'));

const test = ifd(undefined, false, NaN, 0, false, {
  default: 'will-not-get-here',
  zero: true
});

module.exports = {
  exp: function (should) {
    should.equal(test, 0);
  }
};
