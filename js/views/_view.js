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

    function updateTemplate(view, callback) {
        require(['text!templates/'+view.template+'.html'], function(template) {

            view._templateFile = template;
            view._isTemplateLoaded = true;

            if (typeof callback === 'function') {
                callback.call(view);
            }
        });
    }

    return Backbone.View.extend({

        _isTemplateLoaded: false,

        /**
         *
         */
        update: function() {
            var template, data;

            /*
             * Basic view uses lazy template loading.
             */
            if (!this._isTemplateLoaded) {
                updateTemplate(this, this.update);
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
        }
    });

});