const path  = require('path'),
      ifd  = require(path.join(process.cwd(), 'dist/ifd.js'));

const test = ifd(NaN, undefined, false, null, false, {
  default: 'will-not-get-here',
  undefined: true
});

module.exports = {
  exp: function (should) {
    should.equal(test, null);
  }
};
