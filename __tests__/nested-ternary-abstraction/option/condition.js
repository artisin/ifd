const path  = require('path');
const ifd   = require(path.join(process.cwd(), 'dist/ifd.js'));

const test = ifd(
  [undefined, 'one'],
  [false, 'two'],
  [NaN, 'three'],
  // evaluated the <return> condition and since
  // its false it will not return true, the <condition>
  [true, false],
  [true, 'four'],
  ['kool', 'six'], {
    condition: true
  }
);

module.exports = {
  exp: function (should) {
    should.equal(test, 'four');
  }
};
