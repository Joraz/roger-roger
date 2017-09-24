# roger-roger

A small utility library to deeply clone an object.

No production dependencies (just mocha/chai for tests).

Just `require` it and use it like so:

```javascript
const deepClone = require('roger-roger');

const myObj = { Star: 'Wars'};

const myClone = deepClone(myObj);

myObj !== myClone // true

myClone.Star === 'Wars' // true
```

## Limitations
Doesn't handle es6 features like `Class`, `Map`, & `Set`.

Requires Node 6.x+

## Running tests
`npm i` to install dependencies, then `npm test`.