define([
    'dX/ResponsiveView',
    'text!snippets/loading.html'
], function(
    dXResponsiveView,
    loading
) {

    /**
     * Example of a simple view with a collection of items.
     *
     * @class First
     * @author Riplexus <riplexus@gmail.com>
     */

    return dXResponsiveView.extend(/** @lends First.prototype */{
        dXName: 'First',

        /**
         * Example of subview declarations.
         */

        dXSubViews: [
            'First__Sub'
        ],

        /**
         *
         */

        dXLoading: loading
    });
});