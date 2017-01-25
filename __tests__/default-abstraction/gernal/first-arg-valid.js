const path  = require('path'),
      ifd  = require(path.join(process.cwd(), 'dist/ifd.js'));

const test = ifd('test', false, null);

module.exports = {
  exp: function (should) {
    should.equal(test, 'test');
  }
};
