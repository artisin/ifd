const path  = require('path'),
      ifd  = require(path.join(process.cwd(), 'dist/ifd.js'));

const test = ifd(1, 2, 3, 4, 5, 6, true, {
  identity: function (val) {
    return {
      pass: val === 4,
      val: 'four is more'
    };
  }
});

module.exports = {
  exp: function (should) {
    should.equal(test, 'four is more');
  }
};
