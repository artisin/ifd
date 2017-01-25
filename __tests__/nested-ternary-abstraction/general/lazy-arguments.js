const path  = require('path'),
      ifd  = require(path.join(process.cwd(), 'dist/ifd.js'));

const bump = function () {
  if (this.count === 100) {
    return true;
  }
  this.count += 100;
};

const lazy = ifd(
  //invokes bump, since no count it sets it and
  //returns false
  [bump, 'nonLazy'],
  //once it hits bump, it returns the count
  [[ifd, false, bump, 'yolo'], 'lazy'],
  [true, 'kool'], {
    self: {
      count: 0
    }
  }
);


const self = {
  count: 0
};
const nonLazy = ifd(
  [bump, 'nonLazy'],
  //this ifd will evaluate first, thus 'one' will be returned
  [ifd(false, bump, 'yolo', {self: self}), 'lazy'],
  [true, 'kool'], {
    self: self
  }
);


module.exports = {
  exp: function (should) {
    should.equal(lazy, 'lazy');
    should.equal(nonLazy, 'nonLazy');
  }
};
