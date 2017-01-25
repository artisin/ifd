const path  = require('path'),
      ifd  = require(path.join(process.cwd(), 'dist/ifd.js'));

const bump = function () {
  if (this.count === 2900) {
    return true;
  }
};

const lazy = ifd(
  //invokes bump, since no count it sets it and
  //returns false
  [bump, 'nonLazy'],
  //once it hits bump, it returns the count
  [[ifd, false, bump, 'yolo', {
    self: {
      count: 2900
    }
  }], 'lazy'],
  [true, 'kool'], {
    self: {
      count: 0
    }
  }
);


module.exports = {
  exp: function (should) {
    should.equal(lazy, 'lazy');
  }
};
