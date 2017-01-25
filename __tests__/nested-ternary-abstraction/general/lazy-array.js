const path  = require('path'),
      ifd  = require(path.join(process.cwd(), 'dist/ifd.js'));

const bump = function () {
  this.count += 100;
  if (this.count === 300) {
    return this.count;
  }
};

const lazy = ifd(
  //invokes bump, not vaild since bump only 100
  [bump, 'nonLazy'],
  //hits bump one
  [[ifd, [bump, 'bump-two'], [bump, 'lazy'], [bump, 'wont-get-here']], '%p'],
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
  //inkoved first
  [ifd([bump, 'bump-two'], [bump, 'lazy'], {self: self}), '%p'],
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
