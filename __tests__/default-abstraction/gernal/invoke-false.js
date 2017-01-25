const path  = require('path'),
      ifd  = require(path.join(process.cwd(), 'dist/ifd.js'));


const test = ifd(undefined, null, () => 'test', true, {
  invoke: false
});

module.exports = {
  exp: function (should) {
    //need to invoke test
    should.equal(test(), 'test');
  }
};
