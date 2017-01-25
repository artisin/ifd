
// if 0 is not a "falsey" value, then we gotz a problem
const foo = 0 || 5;

module.exports = {
  exp: function (should) {
    should.equal(foo, 5);
  }
};
