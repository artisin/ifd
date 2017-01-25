const path  = require('path'),
      ifd  = require(path.join(process.cwd(), 'dist/ifd.js'));

const bump = function () {
  this.count += 100;
  if (this.count === 3000) {
    return this.count;
  }
};

const lazy = ifd(
  //invokes bump, not vaild since bump only 100
  [bump, 'nonLazy'],
  //hits bump one, sets new option arg
  [[ifd, [bump, 'bump-two'], [bump, 'lazy'], [bump, 'wont-get-here'], {
    self: {
      count: 2800
    }
  }], '%p'],
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
