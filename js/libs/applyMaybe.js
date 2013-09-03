define(function() {

    /**
     * Apply arguments to a function, if the function is
     * defined. Wrapper to reduce code.
     *
     * @param {object} obj
     * @param {string} fname
     * @param {Array} [args]
     * @param {object} [scope]
     * @global
     */

    return function applyMaybe(obj, fname, args, scope){
        if (typeof obj[fname] === 'function') {
            return obj[fname].apply(scope || obj, args || []);
        }
        return null;
    };
});