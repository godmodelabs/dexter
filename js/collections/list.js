define([
    'underscore',
    'jquery',
    'backbone',
    'collections/dXCollection',
    'models/list__item',
    'views/list__item'
], function(
    _, $,
    Backbone,
    dXCollection,
    ListItemModel,
    ListItemView
) {

    return dXCollection.extend({
        model: ListItemModel,
        view: ListItemView
    });

});