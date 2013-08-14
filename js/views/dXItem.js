/**
 *
 *
 * @author: Tamas-Imre Lukacs
 */

define([
    'libs/debug',
    'underscore',
    'jquery',
    'backbone',
    'libs/uuid',
    'views/dXView',
    'mustache',
    'libs/applyMaybe'
], function(
    debug,
    _, $,
    Backbone,
    uuid,
    dXView,
    mustache,
    applyMaybe
) {

    debug = debug('DX');

    /**
     *
     */

    return dXView.extend({

        /**
         *
         * @returns {*}
         */

        el: function() {
            var template = mustache.render(require('text!templates/'+this.dXName+'.html'),
                typeof this.dXTemplateData === 'function'?
                    this.dXTemplateData() : this.dXTemplateData);

            // Strange jQuery bug TODO investigate
            while (template[0] === '\r' ||
                template[0] === '\n' ||
                template[0] === '\t' ||
                template[0] === ' ') {
                template = template.substr(1, template.length-1);
            }

            return template;
        },

        /**
         * The template have to be available at the <el> call
         * to support the data binding through epoxy. Thus we
         * have to override <dXEnter> to prevent the html to
         * be replaced.
         */

        dXEnter: function() {
            // Set unique id for further dom access
            this.$el.attr('id', this.dXId);

            // Load subviews
            this.dXGetSubViews();

            // Call Enter functions
            this.dXCallEnter();
        },

        /**
         * Override <dXCallEnter> to suppress debugging output.
         */

        dXCallEnter: function dXCallEnter() {
            applyMaybe(this, 'enter');
        }

    });
});