const path  = require('path'),
      ifd  = require(path.join(process.cwd(), 'dist/ifd.js'));

const test = ifd(undefined, false, NaN, null, false);

module.exports = {
  exp: function (should) {
    should.equal(test, false);
  }
};
