const path  = require('path'),
      ifd  = require(path.join(process.cwd(), 'dist/ifd.js'));

const test = ifd(null, NaN, false, undefined, {
  default: 'will-not-get-here',
  all: false,
  null: false,
  nan: false
});

module.exports = {
  exp: function (should) {
    should.equal(test, false);
  }
};
