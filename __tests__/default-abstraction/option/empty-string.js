const path  = require('path'),
      ifd  = require(path.join(process.cwd(), 'dist/ifd.js'));

const test = ifd(undefined, false, '', null, false, {
  default: 'will-not-get-here',
  emptyString: true
});

module.exports = {
  exp: function (should) {
    should.equal(test, '');
  }
};
