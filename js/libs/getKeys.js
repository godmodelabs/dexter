define(function() {

    /**
     * Return the keys of an object. Shim
     * for browsers without Object.getKeys support.
     *
     * @param obj
     * @returns {Array}
     * @global
     */

    return function getKeys(obj){
        var key, keys = [];

        for(key in obj){
            if (obj.hasOwnProperty(key)) {
                keys.push(key);
            }
        }

        return keys;
    };
});