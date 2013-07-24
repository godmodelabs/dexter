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

    function updateTemplate(view, callback, updateCallback) {
        require(['text!templates/'+view.name+'.html'], function(template) {

            view._templateFile = template;
            view._isTemplateLoaded = true;

            if (typeof callback === 'function') {
                callback.call(view, updateCallback);
            }
        });
    }

    return Backbone.View.extend({

        _isTemplateLoaded: false,
        subViews: [],

        /**
         *
         * @returns {HTMLElement}
         */
        el: function() {
            return $('#'+this.name);
        },

        /**
         *
         */
        render: function(callback) {
            callback = callback || function() {};

            applyMaybe(this, 'update', [function() {
                callback();
            }]);
        },

        /**
         *
         */
        update: function(callback) {
            var template, data;

            callback = callback || function() {};

            /*
             * Basic view uses lazy template loading.
             */
            if (!this._isTemplateLoaded) {
                updateTemplate(this, this.update, callback);
                return;
            }

            data = applyMaybe(this, 'templateData');

            /*
             * If we got data from the view, render it with mustache.
             */
            if (data === null) {
                template = this._templateFile;
            } else {
                template = Mustache.render(this._templateFile, data);
            }

            this.$el.html(template);
            callback();
        },

        /**
         *
         */
        clear: function() {
            this.$el.html('');
        }
    });

});