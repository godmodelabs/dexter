define(function() {

    /**
     * Remove duplicate entries in an array.
     *
     * @param {Array} arr
     * @returns {Array}
     * @global
     */

    return function unique(arr){
        var u = {}, a = [];
        for(var i = 0, l = arr.length; i < l; ++i){
            if(u.hasOwnProperty(arr[i])) {
                continue;
            }
            a.push(arr[i]);
            u[arr[i]] = 1;
        }
        return a;
    };
});