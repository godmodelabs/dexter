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
        defaults: {
            width: 15,
            height: 15
        }
    });

});