const path  = require('path'),
      ifd  = require(path.join(process.cwd(), 'dist/ifd.js'));

//if going to return the last array not five
const test = ifd(
  [undefined, 'one'],
  [false, 'two'],
  [NaN, 'three'],
  [null, 'four'],
  [false, 'five'], {
    default: 'The default return'
  }
);

module.exports = {
  exp: function (should) {
    should.equal(test, 'The default return');
  }
};
