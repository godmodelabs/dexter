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
        dXName: 'static__MyList',

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

        events: {
            'click .add': 'add',
            'click .pop': 'pop'
        },

        /**
         * Fill our collection with three dummy entries.
         */

        initialize: function() {
            dXStaticView.prototype.initialize.call(this);

            this.collection.add({ key: 'one' });
            this.collection.add({ key: 'two' });
            this.collection.add({ key: 'three' });
        },

        /**
         * Add a dummy entry to the collection.
         */

        add: function() {
            this.collection.add({
                key: this.$el.find('input').val()
            });
        },

        /**
         * Remove the last entry from the collection.
         */

        pop: function() {
            this.collection.pop();
        }
    });
});