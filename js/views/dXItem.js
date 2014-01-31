define([
    'libs/debug',
    'underscore',
    'jquery',
    'backbone',
    'libs/uuid',
    'views/dXView',
    'libs/applyMaybe'
], function(
    debug,
    _, $,
    Backbone,
    uuid,
    dXView,
    applyMaybe
) {

    debug = debug('DX');

    /**
     * dXItem is the representation of a collection entry in
     * the dom. This and every extended view can be referenced
     * to any collections view attribute and will be created
     * if items are added to the collection.
     *
     * @class dXItem
     * @author Riplexus <riplexus@gmail.com>
     */

    var dXItem = dXView.extend(/** @lends dXItem.prototype */{

        /**
         * We have to build the template here, to work properly
         * with epoxy. The template is already loaded and can be
         * required synchronously.
         *
         * @augments dXView
         * @returns {string}
         */

        el: function() {
            var templateName, template;

            templateName = this.dXConfig.templateName || this.dXName;
            template = this.dXTemplateRenderer(require('text!templates/'+templateName+'.html'),
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
         * The template has to be available at the {@link dXItem#el}
         * call to support the data binding through epoxy. Thus we
         * have to override {@link dXView#dXEnter} to prevent the
         * html to be replaced.
         * We still need to set the $el id, load any subviews with
         * {@link dXView#dXGetSubViews} and call the enter functions
         * via {@link dXView#dXCallEnter}.
         *
         * @augments dXView
         */

        dXEnter: function() {
            this.$el.attr('id', this.dXId);
            this.dXGetSubViews();
            this.dXCallEnter();
        },

        /**
         * Override {@link dXView#dXCallEnter} to suppress debugging
         * output for every item added.
         *
         * @augments dXView
         */

        dXCallEnter: function dXCallEnter() {
            applyMaybe(this, 'enter');
        }
    });

    return dXItem;
});