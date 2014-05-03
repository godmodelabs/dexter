define([
    'dX/ResponsiveView'
], function(
    dXResponsiveView
) {

    /**
     * Dummy view, to ease the first start.
     *
     * @class HelloWorld
     * @author Riplexus <riplexus@gmail.com>
     */

    return dXResponsiveView.extend(/** @lends HelloWorld.prototype */{
        dXName: 'HelloWorld',

        /**
         * My Function.
         * 
         * @augments dXView
         */
            
        myFn: function() {
            
        }
    });
});