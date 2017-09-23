/**
 * Function that accepts an object and makes a deep clone of it, recursing as necessary
 * @param {any} object The object to clone
 */
function deepClone(object) {
    // A primitive is fine to return as-is, since it is never passed by reference
    if (isPrimitive(object)) {
        return object;
    }

    // Handle arrays by iterating over and returning a new array, calling 'deepClone' recursively on each item
    if (Array.isArray(object)) {
        const returnArray = [];
        for (let i = 0; i < object.length; i++) {
            const prop = object[i];
            returnArray[i] = deepClone(prop);
        }

        return returnArray;
    }

    // Handle plain objects by iterating through the key/value pairs, calling 'deepClone' on each value
    if (isObject(object)) {
        const returnObject = {};

        // go through the object properties
        Object.keys(object).forEach((key) => {
            if (object.hasOwnProperty(key)) {
                const value = object[key];
                returnObject[key] = deepClone(value);
            }
        });

        return returnObject;
    }

    // If it isn't a primitive, array or object just return as-is
    return object;
}

/**
 * Returns a boolean indicating whether or not the given value is a primitive, or not.
 *
 * In JS these are:
 * - `undefined`
 * - `null`
 * - `boolean`
 * - `string`
 * - `number`
 *
 * @param {any} value The value to check
 * @returns {boolean}
 */
function isPrimitive(value) {
    var valueType = typeof value;
    if (valueType === 'object' || valueType === 'function') {
        return false;
    }

    return true;
}

/**
 * Returns a boolean indicating whether or not the value is a plain javascript object
 * @param {any} value The value to check
 * @returns {boolean}
 */
function isObject(value) {
    // If this is a plain object, it will deeply equal when called with the object constructor
    return value === Object(value);
}

module.exports = deepClone;