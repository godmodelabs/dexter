define([
    'dX/ItemView'
], function(
    dXItemView
) {

    /**
     * Example of a simple item view.
     *
     * @class ItemView
     * @author Riplexus <riplexus@gmail.com>
     */

    return dXItemView.extend(/** @lends ItemView.prototype */{
        dXName: 'i-Item',

        /**
         * Bind the model attribute 'key' as text 
         * to the <li> node in our template.
         */
        
        bindings: {
            'li': 'text:key'
        }
    });
});