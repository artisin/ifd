__Description__: Array based `ifd` uses Arrays to run conditions against. 

__Syntax__

```
const test = ifd([<if-condition>, <return>], [<if-condition>, <return>]);
```


__Notes__

+ If the condition is true it also run the return through the wringer to make sure the return value is not falsey
  * If you want a falsey return you can set the `arrayCond` to `false`

