define([
    'jquery',
    'mustache',
    'views/_responsive',
    'collections/column',
], function($, Mustache, ResponsiveView, ColumnCollection) {

    return ResponsiveView.extend({

        el: $('#content'),

        template: 'column',

        templateData: function() {
            return {
                articles: this.collection.models
            };
        },

        initialize: function() {
            var self = this;

            this.collection = new ColumnCollection();
            this.collection.on('add', function() {
                self.update();
            });
            this.collection.on('change', function() {
                self.update();
            });
        },

        draw: function() {
            this.collection.add({ author: 'itseme mario' });
            this.collection.add({ author: 'luigi..' });
        },

        drawMobile: function() {},

        drawTablet: function() {
            this.collection.add({ author: 'For Tablet' });
        },

        drawDesktop: function() {
            this.collection.add({ author: 'For Dekstop' });
        },

        leave: function() {
        }
    });

});