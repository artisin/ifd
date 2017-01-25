const path  = require('path'),
      ifd  = require(path.join(process.cwd(), 'dist/ifd.js'));

const test = ifd([1], [1, 1], [1, 3, 5], [2, 2, 2], [2, 1, 2], {
  arrayArgs: false,
  identity: function (arr) {
    for (let i = arr.length - 1; i >= 0; i--) {
      if (arr[i] % 2 !== 0) {
        return false;
      }
    }
    return true;
  }
});

module.exports = {
  exp: function () {
    test.should.containDeep([2, 2, 2]);
  }
};
