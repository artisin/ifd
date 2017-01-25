const path  = require('path'),
      ifd  = require(path.join(process.cwd(), 'dist/ifd.js'));

const customIfd = ifd({
  create: true,
  zero: true,
  identity: function (val) {
    return val % 2 === 0;
  }
});

const testOne = customIfd(1, 3, false, 0, 2, 'kool');
const testTwo = customIfd(1, 3, false, 0, 2, 'kool', {
  zero: false
});


module.exports = {
  exp: function (should) {
    should.equal(testOne, 0);
    should.equal(testTwo, 2);
  }
};
