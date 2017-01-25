const path  = require('path'),
      ifd  = require(path.join(process.cwd(), 'dist/ifd.js'));

//if the identity passes either identity test
const customOr = ifd({
  create: true,
  identity: [function (val) {
    return val % 2 === 0;
  }]
});
const testOne = customOr('one', 1, 'two', 3, 5, 6, 11, 'kool', {
  identity: [function (val) {
    return typeof val !== 'string';
  }]
});


//if everyIdentity then it has to pass both identity tests
const customAnd = ifd({
  create: true,
  everyIdentity: true,
  identity: [function (val) {
    return val % 2 === 0;
  }]
});
const testTwo = customAnd('one', 1, 'two', 3, 5, 6, 11, 'kool', {
  identity: [function (val) {
    return typeof val !== 'string';
  }]
});


module.exports = {
  exp: function (should) {
    should.equal(testOne, 1);
    should.equal(testTwo, 6);
  }
};
