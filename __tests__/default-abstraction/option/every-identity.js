const path  = require('path'),
      ifd  = require(path.join(process.cwd(), 'dist/ifd.js'));


//if everyIdentity then it has to pass both identity tests
const test = ifd('one', 1, 'two', 3, 5, 6, 11, 'kool', {
  everyIdentity: true,
  identity: [
    function (val) {
      return val % 2 === 0;
    },
    function (val) {
      return typeof val !== 'string';
    }
  ]
});


module.exports = {
  exp: function (should) {
    should.equal(test, 6);
  }
};
