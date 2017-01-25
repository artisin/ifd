const path  = require('path'),
      ifd  = require(path.join(process.cwd(), 'dist/ifd.js'));


const acum = function () {
  if (this.count === 3) {
    return 'three';
  }
  ++this.count;
};

const test = ifd(acum, acum, acum, acum, {
  self: {
    count: 0
  }
});

module.exports = {
  exp: function (should) {
    should.equal(test, 'three');
  }
};
