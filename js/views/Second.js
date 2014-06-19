define([
    'dX/ResponsiveView'
], function(
    dXResponsiveView
) {

    /**
     * Example of a second view.
     *
     * @class SecondView
     * @author Riplexus <riplexus@gmail.com>
     */

    return dXResponsiveView.extend(/** @lends SecondView.prototype */{
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