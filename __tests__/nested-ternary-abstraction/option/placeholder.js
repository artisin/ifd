const path  = require('path'),
      ifd  = require(path.join(process.cwd(), 'dist/ifd.js'));

const test = ifd(
  [undefined, 'one'],
  [[ifd, false, null, 'yolo'], '__YOLO__'],
  [true, 'kool'], {
    //changes the place holder return
    placeholder: '__YOLO__'
  }
);


module.exports = {
  exp: function (should) {
    should.equal(test, 'yolo');
  }
};
