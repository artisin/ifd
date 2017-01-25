const path  = require('path');
const ifd   = require(path.join(process.cwd(), 'dist/ifd.js'));

let hitSelf = false;
let hitSelfAgain = false;
const isAnArrayOfTwo = ifd({
  default: false,
  identity: function (val) {
    if (this && this.hitSelf) { hitSelf = true; }
    if (this && this.hitSelfAgain) { hitSelfAgain = true; }
    return Array.isArray(val) && val.length === 2;
  }
});

const testCond = ifd(
  [[isAnArrayOfTwo, false, null, 0, [2]], 'not-me'],
  [[isAnArrayOfTwo, [2, 3, 4], false], 'or-me-either'],
  [[isAnArrayOfTwo, false, [1, 2], null, [2]], 'pick-me'],
  [[isAnArrayOfTwo, null, []], 'or-me-too']
);
const testPlace = ifd(
  [[isAnArrayOfTwo, false, null, 0, [2], {self: {hitSelfAgain: true}}], '%p'],
  [[isAnArrayOfTwo, [2, 3, 4], false], '%p'],
  [[isAnArrayOfTwo, false, [1, 2], null, [2]], '%p'],
  [[isAnArrayOfTwo, null, []], '%p'], {
    self: {
      hitSelf: true
    }
  }
);

module.exports = {
  exp: function (should) {
    should.equal(testCond, 'pick-me');
    should.deepEqual(testPlace, [1, 2]);
    should.equal(hitSelf, true);
    should.equal(hitSelfAgain, true);
  }
};
