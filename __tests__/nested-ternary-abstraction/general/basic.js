const path  = require('path');
const ifd   = require(path.join(process.cwd(), 'dist/ifd.js'));

const test = ifd(
  [undefined, 'one'],
  [false, 'two'],
  [NaN, 'three'],
  [null, 'four'],
  //return
  [true, 'five'],
  ['kool', 'six']
);

module.exports = {
  exp: function (should) {
    should.equal(test, 'five');
  }
};
