define([
    'dX/ResponsiveView',
    'collections/items',
    'views/item/Item'
], function(
    dXResponsiveView,
    ItemsCollection,
    ItemView
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
            'First__Third'
        ],

        /**
         * We want to show the entries of an ItemsCollection 
         * in this view, so we need to reference it.
         */
        
        collection: new ItemsCollection(),

        /**
         * Every entry of the collection in our #First view 
         * will use this item view.
         */
        
        itemView: ItemView,

        /**
         * Bind the collection items to a .list container.
         */
        
        bindings: {
            '.list': 'collection:$collection'
        },

        /**
         * Fill our collection with three dummy entries.
         */
        
        initialize: function() {
            dXResponsiveView.prototype.initialize.call(this);
            
            this.collection.add({});
            this.collection.add({});
            this.collection.add({});
        }
    });
});