define(function() {

    /**
     * Get the different intersections of two objects.
     *
     * @param a
     * @param b
     * @returns {Array}
     * @ignore
     */

    return function intersect(a, b) {
        var n, ret;

        ret = [{}, {}, {}];

        for (n in a) {
            if (n in b) {
                ret[0][n] = a[n];
            } else {
                ret[1][n] = a[n];
            }
        }
        for (n in b) {
            if (!(n in a)) {
                ret[2][n] = b[n];
            }
        }

        return ret;
    };
});