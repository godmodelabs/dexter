define([
    'dX/StaticView'
], function(
    dXStaticView
) {

    /**
     * Example of a basic static view. 
     * It does not have to be in a subfolder, but if any view is, 
     * you must prefix its dXName with the folder name.
     *
     * @class Static
     * @author Riplexus <riplexus@gmail.com>
     */

    return dXStaticView.extend(/** @lends Static.prototype */{
        dXName: 'static__Static'
    });
});