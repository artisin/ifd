const path  = require('path'),
      ifd  = require(path.join(process.cwd(), 'dist/ifd.js'));

const customIfd = ifd({
  create: true,
  identity: function (val) {
    return val % 2 === 0;
  }
});

const test = customIfd(undefined, 1, NaN, 3, 4, true);

module.exports = {
  exp: function (should) {
    should.equal(test, 4);
  }
};
