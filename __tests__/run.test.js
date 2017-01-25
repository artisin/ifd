const _       = require('lodash'),
      fs      = require('fs'),
      glob    = require('glob-all'),
      should  = require('should');


/**
 * Adds/runs test
 * @param {str} testFile -> testFile path
 */
const addTest = function (testFile) {
  //gets the txt file assosiated with test
  const itShould = fs.readFileSync(testFile.replace('.js', '.md'), 'utf-8');
  //run test
  describe(testFile, function () {
    it(itShould, function () {
      //dynamically require test
      const {exp, res} = require('.' + testFile.slice(11));
      //if no result assume expected is a assertion funk
      if (!res) {
        exp(should);
      }else {
        (exp).should.equal(res);
      }
    });
  });
};

//glob, cycle, and test
const testGlob = glob.sync(['./__tests__/**/*.js', '!./__tests__/run.test.js']).reverse();
_.forEach(testGlob, function (testFile) {
  addTest(testFile);
});
