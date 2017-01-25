const path = require('path');
const ifd  = require(path.join(process.cwd(), 'dist/ifd.js'));

const one   = false;
const two   = 'Kool';
const three = false;

const foo = ifd(
  [[ifd, false, null, one], 1],
  [[ifd, two, null], 2],
  [three, 3], {
    default: false
  }
);
// foo === 2

// Additionaly, you can use a placeholder
// to return the passing condition
const returnCondition = ifd(
  [[ifd, false, null, one], 1],
  //default placeholder = %p
  [[ifd, two, null], '%p'],
  [three, 3], {
    default: false
  }
);
// returnCondition === 'Kool'

module.exports = {
  exp: function (should) {
    should.equal(foo, 2);
    should.equal(returnCondition, 'Kool');
  }
};
