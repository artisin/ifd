const path  = require('path'),
      ifd  = require(path.join(process.cwd(), 'dist/ifd.js'));

const test = ifd(
  [undefined, 'one'],
  [[ifd, false, null, 'yolo'], '%p'],
  [true, 'kool']
);


module.exports = {
  exp: function (should) {
    should.equal(test, 'yolo');
  }
};
