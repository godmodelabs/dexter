define([
    'underscore',
    'dX/Collection',
    'models/item'
], function(
    _,
    dXCollection,
    ItemModel
) {

    /**
     * Example of a basic collection.
     *
     * @class ItemsCollection
     * @author Riplexus <riplexus@gmail.com>
     */

    return dXCollection.extend(/** @lends ItemsCollection.prototype */{ 
        model: ItemModel
    });
});