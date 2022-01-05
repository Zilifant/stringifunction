# StringiFunction

Convert Javascript objects to and from JSON while preserving functions/methods.

Does *not* use Eval to functionizes strings. Instead, uses the slightly less diabolical Function constructor.

### How to use it:

```javascript
stringiFunctionize(object) // Returns a JSON string.
parseStringiFunctions(json) // Returns a JavaScript object.
```

But first: `npm i install stringifunction` installs the thing.
