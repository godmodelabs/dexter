/**
 *
 */

define([
    'shim!Array.indexOf'
], function() {

    return function intersect(a, b) {
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
    }
});