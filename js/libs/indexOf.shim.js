define(function() {

    /**
     * Find an element in an array and return the index.
     * Shim for browsers without Array.indexOf support.
     *
     * @param obj
     * @param fromIndex
     * @returns {number}
     */

    Array.prototype.indexOf = function indexOf(obj, fromIndex) {
        fromIndex = fromIndex || 0;

        if (fromIndex < 0) {
            fromIndex = Math.max(0, this.length + fromIndex);
        }
        for (var i = fromIndex, j = this.length; i < j; i++) {
            if (this[i] === obj) {
                return i;
            }
        }
        return -1;
    };

    return true;
});
