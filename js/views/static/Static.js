define([
    'dX/StaticView',
    'collections/items',
    'views/item/Item'
], function(
    dXStaticView,
    ItemsCollection,
    ItemView
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
        dXName: 'static__Static',

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
            dXStaticView.prototype.initialize.call(this);

            this.collection.add({});
            this.collection.add({});
            this.collection.add({});
        }
    });
});