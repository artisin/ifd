# ifd - Life Extending Ternary Abstractions

[![license](http://img.shields.io/badge/license-mit-3498db.svg)](https://github.com/artisin/ifd/blob/master/LICENSE) [![npm](https://img.shields.io/npm/v/ifd.svg)](https://github.com/artisin/ifd/blob/master/LICENSE) [![Dependencies Status](https://david-dm.org/artisin/ifd.svg)](https://david-dm.org/artisin/ifd) [![wercker status](https://app.wercker.com/status/9045bcfe24ee6d7e8ff8af90e472cd8f/s/master "wercker status")](https://app.wercker.com/project/byKey/9045bcfe24ee6d7e8ff8af90e472cd8f)

As of late my affection for the conciseness-niceness of ternary operators is [sky high](https://youtu.be/7XK7aYq4r80?t=13s). However, nesting ternaries is a one-way ticket to the ternary infirmary. A place where you second guess yourself, proceed to curse and raise your blood pressure resulting in your eventual but early death. In a nutshell, nested ternaries kill. The goal of `ifd` is to provide an alternative to the ternary infirmary by purveying two synergetic abstractions in one tasty punch. One abstraction is to deal with default values, and the other is for nested ternaries both with the goal of extending your life.


Sidenote: Admittedly, `ifd` is the definition of feature creep, but I got sick of working on mind-numbing documentation, and after toying with an idea or two the challenge was too tempting to turn down.



## Core Concepts

The mode of action for ifd is entirely dependent on its arguments. In other words, ifd has two distinct responsibilities under the same action, thus flipping the bird to the single responsibility principle. You may find this to be a questionable or even outright foolish design decision, and on many levels, I would agree. I could have separated ifd into two separate methods or functions, but it came at a cost I was unwilling to pay.


This documentation is relatively brief, so it's in your best interest to look through the tests as well. Each test is separated from one another. The `.js` file is the test and the `.md` file is the description of the test. For the most part, each test focuses on a single aspect and the `.md` file should give you a good general gist of what should happen along with auxiliary notes if I saw fit.



## The "Default" Abstraction

__Info__: Default values at times can be a pain in the butt. For the majority of cases, the pipe operator does the trick, but sometimes the pipe does not make the cut. When I can't pipe, more times than not, I find myself writing logic that for some reason or another turns into a janky mess that tends to creep into my ternaries. To solve this issue, `ifd` first and foremost acts as a truth-teller of identity.

__Action__: Returns first "truth" or returns the last argument if no `default` option Object property is defined.


__Syntax__
```js
ifd(<condition>, <condition>, ..., <options>)
```

__The Falsey Problem__
```js
// if 0 is not a "falsey" value, then we gotz a problem
const foo = 0 || 5;
```

__The Falsey Solution__
```js
const foo = ifd(0, 5, {
  // 0 is not false
  zero: true
});

// foo === 0
```

__A Volume Bump__
```js
// creates custom identity thunk
const isAnArrayOfTwo = ifd({
  identity: function (val) {
    return Array.isArray(val) && val.length === 2;
  }
});

const foo = isAnArrayOfTwo([1, 2, 3], 'te', [4, 5], [6, 7]);

//foo === [4, 5]
```


__Thoughts__: While the "default" abstraction is splendid all by itself, it really spreads its wings when it teams up with its main man the "ternary" abstraction.

__Test Location__: `/__tests__/default-abstraction`


## The "Ternary" Abstraction

__Info__: As I mentioned earlier, nesting ternaries will land you in the ternary infirmary resulting in premature death, and from what I hear death isn't  all that its cracked up to be. To postpone deaths looming inevitability, `ifd` creates an abstraction over array arguments which emulates that of the arguments in a ternary condition in more or less words.

__Action__: If `ifd` has at least two arguments whose arguments are Array values excluding the last optional option argument Object; `ifd` evaluates the arguments using the "ternary" abstraction mode of action. In this mode `ifd` evaluates the `<condition>` arguments via the set "default" abstraction until a truthy `<condition>` is met in which case `ifd` then returns the `<return>` argument for the `<condition>`. If no truthy evaluation for the `<condition>` arguments is met, then the last `<return>` argument is returned if no `default` option Object property is defined.


__Syntax__
```js
ifd([<condition>, <return>], [<condition>, <return>], ..., <options>)
```


__The Nested Ternary Problem__
```js
const one   = false;
const two   = false;
const three = true;

// while this gives us the desired outcome the
// logic is hard to reason about
const foo = one ? 1 : two ? 2 : three ? 3 : 4;
// foo === 3
```


__The Nested Ternary Solution__
```js
const one   = false;
const two   = false;
const three = true;

const foo = ifd([one, 1], [two, 2], [three, 3], { default: 4 });
// foo === 3
```

__"Ternary" Abstraction + "Default" Abstraction__
```js
const one   = false;
const two   = 'Kool';
const three = false;

const foo = ifd(
  [[ifd, false, null, one], 1],
  [[ifd, two, null], 2],
  [three, 3], {
    default: false
  }
);
// foo === 2

// Additionaly, you can use a placeholder
// to return the passing condition
const returnCondition = ifd(
  [[ifd, false, null, one], 1],
  //default placeholder = %p
  [[ifd, two, null], '%p'],
  [three, 3], {
    default: false
  }
);
// returnCondition === 'Kool'
```

__Function Evaluation__
```js
const one   = false;
const two   = false;
const three = true;

const foo = ifd([one, 1], [two, 2], [three, 3], { default: 4 });
// foo === 3
```


__A Volume Bump__
```js
// creates custom identity thunk
const isAnArrayOfTwo = ifd({
  // if isAnArryOfTwo does not met identity
  // then we want to return false as the default value
  default: false,
  identity: function (val) {
    return Array.isArray(val) && val.length === 2;
  }
});


// lazy evaluation of arguments
const foo = ifd(
  [[isAnArrayOfTwo, false, true, 0, [2]], 'Not Me!'],
  [[isAnArrayOfTwo, [2, 3, 4], false, 'not-an-array'], 'Or Me Either!'],
  // [1, 2] === truthy -> <return>
  [[isAnArrayOfTwo, undefined, [1, 2], null, [2]], 'Pick Me, And Return This String'],
  [[isAnArrayOfTwo, null, []], 'will not be evaluated']
);
```



__Thoughts__: `ifd` goes up to eleven if you need that extra push over the cliff. Right now if you're scratching your head in all likelihood, `ifd` is probably not the package for you because the reason why you would potentially want to use `ifd` should click right away. 



__Test Location__: `/__tests__/default-abstraction`


## Options

### Truth Tellers

+ `all: <Boolean | true>`
    - Sets all default conditions
+ `emptyString: <Boolean | false>`
    - Return on empty String
+ `false: <Boolean | false>`
    - Return on false
+ `NaN: <Boolean | false>`
    - Return on NaN
+ `null: <Boolean | false>`
    - Return on null
+ `undefined: <Boolean | false>`
    - Return on undefined
+ `zero: <Boolean | false>`
    - Return on zero

### Identity

+ `identity: <Function, [Function] | false>`
    - Curstom identity Function
+ `everyIdentity: <Boolean | false>`
    - If identity is an Array of Functions, it must pass all identities
+ `self: <All | Null>`

### Flow

+ `arrayArgs: <Boolean | true>`
    - Assume ternary abstraction if all Array Arguments
+ `condition: <Boolean | true>`
    - Check returning condition for truth
+ `create: <Boolean | true>`
    - Return an `ifd` instance with set options
+ `default: <All | null>`
    - Default return if condition not met
+ `invoke: <Boolean | true>`
    - Invoke Function's in `ifd`
+ `placeholder: <String | '%p'>` 
    - Placeholder return


---

Best, te
