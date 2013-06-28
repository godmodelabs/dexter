/**
 *
 */
define(function() {

    /**
     * ToDo
     *
     * @param {Object} obj
     * @param {String} fname
     * @param {Array} [args]
     * @param {Object} [scope]
     */
    var applyMaybe = function applyMaybe(obj, fname, args, scope){
        if (typeof obj[fname] === 'function') {
            return obj[fname].call(scope || obj, args);
        }
        return null;
    };

    return applyMaybe;
});