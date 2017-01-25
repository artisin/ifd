const path  = require('path'),
      ifd  = require(path.join(process.cwd(), 'dist/ifd.js'));

const test = ifd(undefined, false, NaN, null, false, {
  default: 'will-not-get-here',
  NaN: true
});

module.exports = {
  exp: function (should) {
    should.equal(Number.isNaN(test), true);
  }
};
