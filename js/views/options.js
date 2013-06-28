define([
    'jquery',
    'mustache',
    'views/_responsive',
], function($, Mustache, ResponsiveView) {

    return ResponsiveView.extend({

        el: $('#menu'),

        template: 'options',

        draw: function() {
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