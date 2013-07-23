define([
    'jquery',
    'mustache',
    'views/_view'
], function($, Mustache, View) {

    return View.extend({

        name: 'view',

        templateData: function() {
            return {
                name: this.name
            };
        },

        initialize: function() {
        },

        enter: function() {},

        leave: function() {
            this.clear();
        }
    });

});