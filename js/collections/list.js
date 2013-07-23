define([
    'underscore',
    'backbone',
    'models/listitem'
], function(_, Backbone, ListItem) {

    return Backbone.Collection.extend({
        model: ListItem
    });

});