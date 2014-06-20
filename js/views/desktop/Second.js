define([
    'views/Second'
], function(
    SecondView
) {

    /**
     * Example of a second view, desktop systems only.
     *
     * @class Second
     * @author Riplexus <riplexus@gmail.com>
     */

    return SecondView.extend(/** @lends Second.prototype */{

        /**
         * Will be called on enter.
         * 
         * @augments dXView
         */
            
        enter: function() {
            console.log("You are on a desktop!");
        }
    });
});