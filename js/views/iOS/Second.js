define([
    'views/Second'
], function(
    SecondView
) {

    /**
     * Example of a second view, iOS systems only.
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
            console.log("You got an iOS device!");
        }
    });
});