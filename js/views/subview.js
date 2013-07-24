define([
    'jquery',
    'mustache',
    'views/_view'
], function($, Mustache, View) {

    return View.extend({

        name: 'subView',

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
            console.log(this.name + ' leave');
        }
    });

});