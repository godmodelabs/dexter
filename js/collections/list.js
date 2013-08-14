define([
    'underscore',
    'backbone',
    'models/list__item',
    'views/list__item'
], function(_, Backbone, ListItemModel, ListItemView) {

    return Backbone.Collection.extend({
        model: ListItemModel,
        view: ListItemView
    });

});