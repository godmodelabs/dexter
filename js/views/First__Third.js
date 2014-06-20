define([
    'dX/View'
], function(
    dXView
) {

    /**
     * Example of a view used as subview in First. You can use any naming
     * methodology, for example BEM. 
     *
     * @class FirstThird
     * @author Riplexus <riplexus@gmail.com>
     */

    return dXView.extend(/** @lends FirstThird.prototype */{
        dXName: 'First__Third',

        /**
         * Use another subview. You can go as deep as you like.
         */
        
        dXSubViews: [
            'First__Third__Fourth'
        ]
    });
});