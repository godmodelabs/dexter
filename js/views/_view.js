/**
 *
 *
 * @author: Tamas-Imre Lukacs
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'mustache',
    'libs/applyMaybe',
    'shim!console'
], function($, _, Backbone, Mustache, applyMaybe) {

    return Backbone.View.extend({

        /**
         *
         */
        update: function() {
            var template, data;

            data = applyMaybe(this, 'templateData');

            if (data === null) {
                template = this.template;
            } else {
                template = Mustache.render(this.template, data);
            }

            this.$el.html(template);
        }
    });

});