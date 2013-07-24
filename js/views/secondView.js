define([
    'jquery',
    'mustache',
    'views/_view'
], function($, Mustache, View) {

    return View.extend({

        name: 'secondView',

        templateData: function() {
            return {
                name: this.name
            };
        },

        initialize: function() {

        },

        enter: function() {
            console.log(this.name + ' enter');
        },

        leave: function() {
            this.clear();
            console.log(this.name + ' leave');
        }
    });

});