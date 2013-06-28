define([
    'jquery',
    'mustache',
    'views/_responsive',
    'collections/column',
    'models/article',
    'text!templates/options.html'
], function($, Mustache, ResponsiveView, ColumnCollection, ModelArticle, template) {

    return ResponsiveView.extend({

        el: $('#menu'),

        template: template,

        draw: function() {
            console.log('enter options');
            this.update();
        },

        drawMobile: function() {},

        drawTablet: function() {},

        drawDesktop: function() {},

        leave: function() {
            this.$el.empty();
        }
    });

});