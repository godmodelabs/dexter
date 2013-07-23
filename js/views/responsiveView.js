define([
    'jquery',
    'mustache',
    'views/_responsive',
    'collections/list',
], function($, Mustache, ResponsiveView, List) {

    return ResponsiveView.extend({

        name: 'responsiveView',

        templateData: function() {
            return {
                list: this.list.models,
                name: this.name
            };
        },

        initialize: function() {
            var self = this;

            this.list = new List();

            // Insert dummy data
            this.list.add({ title: 'itseme mario' });
            this.list.add({ title: 'luigi..' });

            this.list.on('add', function() {
                self.update();
            });
            this.list.on('change', function() {
                self.update();
            });
        },

        enter: function() {

        },

        enterMobile: function() {

        },

        enterTablet: function() {

        },

        enterDesktop: function() {

        },

        leave: function() {
            this.clear();
        }
    });

});