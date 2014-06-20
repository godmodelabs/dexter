define([
    'dX/ResponsiveView'
], function(
    dXResponsiveView
) {

    /**
     * Example of a second view.
     *
     * @class Second
     * @author Riplexus <riplexus@gmail.com>
     */

    return dXResponsiveView.extend(/** @lends Second.prototype */{
        dXName: 'Second',

        /**
         * Will be called on enter.
         * 
         * @augments dXView
         */
            
        enter: function() {
            console.log("You are not on a desktop!");
        }
    });
});