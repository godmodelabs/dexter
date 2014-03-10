define(function() {

    /**
     * 
     * @param elem
     * @param prefix
     */

    function removeClasses(elem, prefix) {
        var classes = elem.className.split(' ').filter(function(cls) {
            return cls.lastIndexOf(prefix, 0) !== 0;
        });
        elem.className = classes.join(' ');
    }

    return removeClasses;
});