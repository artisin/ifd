const isNul    = require('lodash.isnull');
const isUnf    = require('lodash.isundefined');
const isNan    = require('lodash.isnan');
const isArr    = require('lodash.isarray');
const isFnc    = require('lodash.isfunction');
const isObj    = require('lodash.isplainobject');
const has      = require('lodash.has');


const ifd = function () {
  //if to return a raw value
  let __raw__ = false;
  //gen dem args
  const args = [...arguments];

  /**
   * Helper to gen the default options
   * @param  {---} def -> default, only time this is not true
   *                      is if the user passes all: false
   * @return {obj}     -> The option Object
   */
  const genOptions = function (def = true) {
    return {
      //sets default conditions
      all: def ? true : false,
      //return on null
      null: def ? false : true,
      //return on undefined
      undefined: def ? false : true,
      //return on zero
      zero: def ? false : true,
      0: def ? false : true,
      //return on NaN
      nan: def ? false : true,
      NaN: def ? false : true,
      //return on emptyStrin
      emptyString: def ? false : true,
      //return on false
      false: def ? false : true,
      //invoke functions
      invoke: def ? true : false,
      //check returning arrray cond
      condition: false,
      //custom XXX function -> fn
      identity: false,
      //has to pass every identity
      everyIdentity: false,
      //default return
      default: null,
      //array based args
      arrayArgs: true,
      //assing this ref
      self: null,
      //truthy return
      truthy: false,
      //array placeholder return
      placeholder: '%p',
      //returns a ifd instance with set options
      create: false
    };
  };


  //create default options
  let options = genOptions();
  let appliedAnOption = false;
  //check for option arg
  if (isObj(args[args.length - 1])) {

    /**
     * Checks to see if the obj in question has option props
     * @param  {obj} _opt -> potential option object
     * @return {bln}      -> the truth
     */
    const hasOption = function (_opt) {
      for (const p in _opt) {
        if (_opt.hasOwnProperty(p) && !isUnf(options[p])) {
          return true;
        }
      }
      return false;
    };

    /**
     * Cylces object and applies its options, then it pops it off the arg list
     * @param  {obj} _opt -> option obj to apply
     * @return {obj}      -> updated option obj
     */
    const applyOption = function (_opt) {
      //check if all is false for reset
      options = _opt.all !== false ? options : genOptions(false);
      //apply options
      for (const p in options) {
        if (options.hasOwnProperty(p) && !isUnf(_opt[p])) {
          appliedAnOption = true;
          if (p === 'identity' && isArr(_opt[p]) && isArr(options[p])) {
            //if thunk create, and both identity are arrays join them
            options[p] = options[p].concat(_opt[p]);
          }else {
            //default action
            options[p] = _opt[p];
          }
        }
      }
      //check for 0 and NaN
      options.nan = _opt.nan === true || _opt.NaN === true;
      options.zero = _opt.zero === true || _opt[0] === true;
      //check for raw return
      __raw__ = !__raw__ && _opt.__raw__ ? true : false;
      //pop dem opts off
      args.pop();
      return options;
    };

    //cycle through args to check for and apply options objs
    for (let o = args.length - 1; o >= 0; o--) {
      if (isObj(args[o]) && hasOption(args[o])) {
        options = applyOption(args[o]);
      }else {
        break;
      }
    }

    //check for identity condition
    if (options.identity !== false) {
      const customArr = isArr(options.identity) ? options.identity : [options.identity];
      //check to make sure user gave us functions
      for (let o = 0; o < customArr.length; o++) {
        if (!isFnc(customArr[o])) {
          options.identity = false;
          console.warn((`ifd error: the "identity" option only accepts a
                        Function or an Array of Functions.`).replace(/\s{2,}/gm, ' '));
        }
      }
      //reassing if still valid
      options.identity = options.identity !== false ? customArr : options.identity;
    }
  }


  //create return thunk
  if (options.create || (!args.length && appliedAnOption)) {
    if (args.length) {
      console.warn((`ifd error: it looks like you are trying to use the create
                   option and the create option only accepts a single argument of the
                   option Object although you have included extra arguments.
                   Please remove the following arguments: "${args}"`).replace(/\s{2,}/gm, ' '));
    }
    //wrapper for thunk so that we can set the proto
    const ifdThunk =  function () {
      //snatch args, concat options
      const _args = [...arguments];
      options.create = false;
      return ifd.apply(this, _args.concat(options));
    };
    //proto for lazy ref and to pick up set options
    ifdThunk.prototype.__idf__ = true;
    ifdThunk.prototype.__optionsThk__ = options;
    return ifdThunk;
  }


  //check if args are all arrays
  let arrayArgs = options.arrayArgs;
  if (arrayArgs) {
    const arrayLenErr = [];
    for (let a = 0; a < args.length; a++) {
      if (!isArr(args[a])) {
        arrayArgs = false;
        break;
      }else if (args[a].length !== 2) {
        arrayLenErr.push(args[a]);
      }
    }
    //throw array length if any
    if (arrayArgs && arrayLenErr.length) {
      console.warn((`ifd error: it looks like you are using Array based conditional arguments
                    but ${arrayLenErr.length} Array(s) did not have the proper length
                    of two. The Array(s) in question are: "${JSON.stringify(arrayLenErr)}".
                    You can either add {arrayArgs: false} to the option Object or fix the
                    Array(s) so they all are two in length.`).replace(/\s{2,}/gm, ' '));
    }
  }


  /**
   * Wrapper to apply.invoke fn arg and pass res if present
   * @param  {fnc} fn   -> The function arg to apply.invoke
   * @param  {---} last -> The result of the origin condition
   */
  const invokeFn = function (fn, last) {
    return fn.apply(options.self, isArr(last) ? last : last);
  };


  /**
   * Runs the val against the conditions
   * @param  {---}  val     -> value to run conditions against
   * @param  {bln} identity -> if running custom fn, recursive shit
   * @return {---}          -> false || {pass, val}
   */
  const ifRes = [];
  const lastVal = [];
  const ifCond = function (val, {identity = false, last = null} = {}) {
    //pushes to ifRes
    const addRes = () => { if (!identity) { ifRes.push(val); }};

    //funk invoke if option, and val is funk
    val = !options.invoke
          ? val
          : isFnc(val)
          //@ bug this is fucked !!!! fuck you
          ? invokeFn(val, arrayArgs ? last : lastVal.length ? lastVal : ifRes)
          : val;

    //check for obj return
    const objRtn = isObj(val) && has(val, 'val') && has(val, 'pass') && Object.keys(val).length === 2;
    if (objRtn) {
      lastVal.length = 0;
      lastVal.push(val);
      if (val.pass === false) { return {pass: false, val: val.val}; }
      return {
        pass: true,
        val: val.val
      };
    }

    //check conditions based on options
    if (!options.zero && val === 0)         { addRes(); return {pass: false, val: 0}; }
    if (!options.nan && isNan(val))         { addRes(); return {pass: false, val: NaN}; }
    if (!options.null && isNul(val))        { addRes(); return {pass: false, val: null}; }
    if (!options.false && val === false)    { addRes(); return {pass: false, val: false}; }
    if (!options.undefined && isUnf(val))   { addRes(); return {pass: false, val: undefined}; }
    if (!options.emptyString && val === '') { addRes(); return {pass: false, val: ''}; }

    //if custom funk conditions
    if (options.identity && !identity) {
      //if res array for ref
      const len = ifRes.length;
      //cycle the array of funks
      for (let i = 0; i < options.identity.length; i++) {
        //invoke identity funk
        const res = options.identity[i].apply(options.self, [val, ifRes[len - 1], ifRes, len]);
        //checks for {pass, val} return
        const pv = isObj(res) && has(res, 'val') && has(res, 'pass');
        //if pv return we use our specified return val otherwise we use the val at hand
        val = pv ? res.val : val;
        const opt = {identity: true, last: val};
        if (pv ? res.pass === true : ifCond(res, opt).pass) {
          //pass identity test
          addRes();
          //if not checking every identity for truth return on first pass
          if (!options.everyIdentity) {
            return {
              pass: true,
              val: val
            };
          }else if (options.identity.length - 1 === i) {
            //last identity, which means it passed all so we return
            return {
              pass: true,
              val: val
            };
          }
        }else if (options.everyIdentity) {
          //did not pass every identity so if fails
          addRes();
          return {
            pass: false,
            val: val
          };
        }
      }
      //fails identity test
      addRes();
      return {
        pass: false,
        val: val
      };
    }

    //>
    addRes();
    return {
      pass: true,
      val: val
    };
  };


  /**
   * Cycle through args and evaluate conditions
   */
  for (let i = 0; i < args.length; i++) {
    let arg = args[i];
    //check for ifd array fn invoke [ifd, ..., ...]
    const ifdFn = isArr(arg) && isArr(arg[0]) && isFnc(arg[0][0]) && arg[0][0].prototype.__idf__;
    // inkove funk need be to eval
    arg = !ifdFn
        ? arg
        : (function () {
          const _arg = arg[0];
          //get/shift off fnToInv
          const fnToInv = arg[0][0];
          _arg.shift();
          //get default opts
          const defaultOpts = genOptions();
          //indicate raw return regardless
          const __options__ = {__raw__: true};
          //wrapper to check and add optiosn
          const cycleAddOpt = function (_opt) {
            for (const p in _opt) {
              if (_opt.hasOwnProperty(p) && _opt[p] !== defaultOpts[p]) {
                __options__[p] = _opt[p];
              }
            }
          };
          //create/push new option arg, order is import, and only want to add non-default opts
          if (isObj(_arg[_arg.length - 1])) { cycleAddOpt(_arg[_arg.length - 1]); }
          if (fnToInv.prototype.__optionsThk__) { cycleAddOpt(fnToInv.prototype.__optionsThk__); }
          cycleAddOpt(options);
          _arg.push(__options__);
          //invoke, contact condition return
          return [fnToInv.apply(null, _arg)].concat(arg[1]);
        }());

    //inkove the arg if funk, based on option cond
    let res;
    arg = !arrayArgs && options.invoke && isFnc(arg) ? ifCond(arg) : arg;
    if (arrayArgs) {
      res = ifCond(arg[0]);
      if (res.pass) {
        //check for placeholder, if so return
        if (arg[1] === options.placeholder) { return res.val; }
        //invoke array arg need be, base on option cond
        arg = options.invoke && isFnc(arg[1]) ? ifCond(arg[1], {last: res.val}) : arg;
        //if condtion we need to make sure return val also passes all conditions
        if (options.condition && (res = ifCond(arg[1], {last: res})) && res.pass) {
          return !__raw__ && options.truthy ? true : arg[1];
        }else if (!options.condition) {
          //default array return
          return !__raw__ && options.truthy ? true : arg[1];
        }
      }
    }else if (!arrayArgs && (res = ifCond(arg)) && res.pass) {
      //arg based return
      return !__raw__ && options.truthy ? true : res.val;
    }
  }

  //Welp, looks like we are out of luck return last, option default, or truthy
  return options.default !== null ? options.default
                                  : options.truthy
                                  ? false
                                  : arrayArgs
                                  ? args[args.length - 1][1]
                                  : args[args.length - 1];
};
//proto for lazy ref
ifd.prototype.__idf__ = true;

module.exports = ifd;
