define([
    'libs/debug',
    'jquery',
    'mustache',
    'views/_view'
], function(debug, $, Mustache, View) {
    debug = debug('EXAMPLE');

    return View.extend({

        name: 'view',
        subViews: ['subView'],

        templateData: function() {
            return {
                name: this.name
            };
        },

        initialize: function() {

        },

        enter: function() {
            debug('enter #'+this.name);
        },

        leave: function() {
            this.clear();
            debug('leave #'+this.name);
        }
    });

});