define([
    'shim!Array.indexOf'
], function() {

    /**
     * Get the different intersections of two arrays.
     *
     * @param {Array} a
     * @param {Array} b
     * @returns {Array}
     * @author Riplexus <riplexus@gmail.com>
     * @ignore
     */

    return function arrayIntersect(a, b) {
        var n, ret;

        ret = [[], [], []];

        for (n=a.length; n--;) {
            if (b.indexOf(a[n]) !== -1) {
                ret[0].push(a[n]);
            } else {
                ret[1].push(a[n]);
            }
        }
        for (n=b.length; n--;) {
            if (a.indexOf(b[n]) === -1) {
                ret[2].push(b[n]);
            }
        }

        return ret;
    };
});