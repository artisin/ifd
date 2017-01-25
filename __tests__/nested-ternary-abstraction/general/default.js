const path  = require('path'),
      ifd  = require(path.join(process.cwd(), 'dist/ifd.js'));

//if going to return the last array not five
const test = ifd(
  [undefined, 'one'],
  [false, 'two'],
  [NaN, 'three'],
  [null, 'four'],
  //defaults and returns
  [false, 'five']
);

module.exports = {
  exp: function (should) {
    should.equal(test, 'five');
  }
};
