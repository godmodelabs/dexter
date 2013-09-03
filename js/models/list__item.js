define([
    'underscore',
    'jquery',
    'backbone',
    'models/dXModel'
], function(
    _, $,
    Backbone,
    dXModel
) {

    return dXModel.extend({
        title: 'default title'
    });

});