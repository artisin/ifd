const path  = require('path'),
      ifd  = require(path.join(process.cwd(), 'dist/ifd.js'));

let sumOne = 0;
let sumTwo = 0;
let collectionOne;
let collectionTwo;
const test = ifd(1, 2, 3, 4, 5, 6, true, {
  identity: [
    function (val, prv, col, index) {
      if (index !== 0) {
        sumOne += prv;
        collectionOne = col;
      }
      //will not validate
      if (val === 100) {
        return true;
      }
    },
    function (val, prv, col, index) {
      if (index !== 0) {
        sumTwo += prv;
        collectionTwo = col;
      }
      //will calitate
      if (val === 5) {
        return true;
      }
    }
  ]
});

module.exports = {
  exp: function (should) {
    should.equal(test, 5);
    collectionOne = collectionOne.reduce(function (prv, cur) {
      return prv + cur;
    });
    should.equal(test + sumOne, collectionOne);
    collectionTwo = collectionTwo.reduce(function (prv, cur) {
      return prv + cur;
    });
    should.equal(test + sumTwo, collectionTwo);
    should.equal(sumOne, sumTwo);
    should.equal(collectionOne, collectionTwo);
  }
};
