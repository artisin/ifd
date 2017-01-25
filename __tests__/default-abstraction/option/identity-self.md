__Description__: Should be able to specify a `self` option prop so that the `self` ref is applied to the `identity` Function, so smooth acsess through `this`.

__Parameters__

+ `fn(val, prv, collection, index)`
    * `this` === `self`
    * `val` the current value to evaluate for the condition
    * `prv` previous value || `undefined` if first
    * `collection` an Array of all previous values
    * `index` index -> `collection.length` 
