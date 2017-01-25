const path  = require('path'),
      ifd  = require(path.join(process.cwd(), 'dist/ifd.js'));

let sum = 0;
let collection;
const test = ifd(1, 2, 3, 4, 5, 6, true, {
  identity: function (val, prv, col, index) {
    if (index !== 0 && this.cool) {
      sum += prv;
    }
    if (val === 5) {
      collection = col;
      return true;
    }
  },
  self: {
    cool: true
  }
});

module.exports = {
  exp: function (should) {
    should.equal(test, 5);
    should.equal(test + sum, collection.reduce(function (prv, cur) {
      return prv + cur;
    }));
  }
};
