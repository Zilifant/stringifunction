// StringiFunction //
// Convert Javascript objects to and from JSON while preserving functions/methods.

// Takes an object. Returns a new object. Converts each property with type `function` into
// a string. Leaves all other properties unchanged.
function stringifyFunctions(obj) {
  const newObj = Object.assign({}, obj);
  for (const prop in newObj) {
    if (typeof newObj[prop] === 'function') newObj[prop] = newObj[prop].toString();
  };
  return newObj;
};

// Stringify object with functions converted to strings.
export const stringiFunctionize = (obj) => JSON.stringify(stringifyFunctions(obj));

// Create new function with previously stringified function as body.
function functionize(str) {
  let fn;

  // Handle cases where the function body is not valid syntax. Returns unaltered string.
  try {
    fn = new Function('return ' + str)();
  } catch (err) {
    console.warn('Invalid syntax; returning unfunctionized string.');
    fn = str;
  };

  return fn;
};

export function parseStringiFunctions(json) {
  return JSON.parse(json, (key, val) => {

    // Check that val is truthy and is a string.
    if (val && typeof val === 'string') {

      // Check for different types of syntax.

      // Basic and Arrow syntax.
      const isBasic       = val.match(/^(async\s+)?function/);
      const isArrowOneArg = val.match(/^(async\s+)?[\w$]+\s*=>/);
      const isArrowParen  = val.match(/^(async\s+)?\([\s\S]*\)\s*=>/);

      // Shorthand syntax.
      const isShortHand   = val.match(new RegExp('^' + key + '\\s*(?!=>)'));
      const isShGen       = val.match(new RegExp('^\\*\\s*' + key + '\\s*'));
      const isShAsync     = val.match(new RegExp('^async\\s+' + key));
      const isShAsyncGen  = val.match(new RegExp('^async\\s*\\*\\s+' + key));

      const isNotShHand = isBasic || isArrowParen || isArrowOneArg;

      if (isNotShHand)  return functionize(val);
      if (isShortHand)  return functionize(`function ${val.slice(key.length)}`);
      if (isShGen)      return functionize(`function* ${val.slice(isShGen[0].length)}`);
      if (isShAsync)    return functionize(`async function ${val.slice(isShAsync[0].length)}`);
      if (isShAsyncGen) return functionize(`async function* ${val.slice(isShAsyncGen[0].length)}`);

      // Return all other strings unaltered.
      return val;
    };

    // Return all non-string values unaltered.
    return val;
  });
};
