__Description__: Should be able to specify a `identity` option prop of a single Function or an Array of Functions. Through this Function you can create a custom condition. If the condition is meet `return` `true` otherwise let it ride out or `return` a falsey value such as `null`.

__Parameters__

+ `fn(val, prv, collection, index)`
    * `val` the current value to evaluate for the condition
    * `prv` previous value || `undefined` if first
    * `collection` an Array of all previous values
    * `index` index -> `collection.length` 


__Notes__

+ If an Array of Function will return if any Function passes. If you want it so that the value must pass every Function use the `everyIdentity` option property