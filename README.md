# StringiFunction

Convert Javascript Objects to and from JSON while preserving functions/methods.

Does **not** use Eval to functionize strings. Uses slightly less diabolical Function constructor.

### How to use it...

```javascript

import { stringiFunctionize, parseStringiFunctions } from 'stringifunction';

stringiFunctionize(object); // Returns a JSON string.
parseStringiFunctions(json); // Returns a JavaScript Object.
```

But first: `npm i stringifunction` installs the thing.
