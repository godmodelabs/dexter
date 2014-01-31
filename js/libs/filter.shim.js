/**
 * Applies `fun` to each element of the array and returns a new array of all
 * the values for which `fun` returned `true`.
 *
 * The first argument given to `fun` is a single array element and the second
 * argument is the index of that element in the array.
 *
 * This definition is compatible with the JavaScript 1.6 definition for
 * `Array#filter` in Spidermonkey and with the definition in the Prototype library.
 *
 * This implementation comes from:
 * https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Global_Objects/Array/filter
 *
 * @function
 * @param   {Function}  fun     predicate function that will be applied to each
 * array element
 * @param   {Object}    [thisp] context in which `fun` will be invoked - `this`
 * in `fun` will refer to `thisp`
 * @returns {Array} a new array containing only the elements for which `fun` return true
 *
 * @source: https://github.com/jivesoftware/jiverscripts/blob/master/src/compat/array.js
 */

define(function() {

    Array.prototype.filter = function(fun/*, thisp*/) {
        var len, res, thisp, i, val;

        len = this.length >>> 0;
        if (typeof fun !== "function") {
            throw new TypeError();
        }

        res = [];
        thisp = arguments[1];
        for (i = 0; i < len; i++) {
            if (i in this) {
                val = this[i]; // in case fun mutates this
                if (fun.call(thisp, val, i)) {
                    res.push(val);
                }
            }
        }

        return res;
    };

    return true;
});