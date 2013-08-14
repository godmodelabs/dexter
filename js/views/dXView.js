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
    'mustache',
    'libs/uuid',
    'libs/applyMaybe'
], function(
    debug,
    _, $,
    Backbone,
    mustache,
    uuid,
    applyMaybe
) {

    debug = debug('DX');

    /**
     *
     */

    return Backbone.Epoxy.View.extend({

        /**
         *
         * @returns {String}
         */

        el: function el() {
            return this.dXScope += ' [data-dX='+this.dXName+']';
        },

        /**
         *
         */

        initialize: function initialize() {
            //debug('init '+this.dXName);

            // Generate unique id for this view
            this.dXId = 'dX-' + uuid();

            // Call enter now, to insert template for data bindings
            this.dXEnter();
        },

        /**
         *
         */

        dXId: null,

        /**
         *
         */

        dXScope: '',

        /**
         *
         */

        dXCache: null,

        /**
         *
         */

        dXSubViewCache: {},

        /**
         *
         */

        dXSubViews: [],

        /**
         *
         */

        dXConfig: {
            clearViewOnLeave: true,
            setLoading: true,
            clearLoading: true
        },

        /**
         *
         * @returns {Object}
         */

        dXGetSubViews: function dXGetSubViews() {
            var i, subView, subViews, subViewName;

            subViews = {};

            for (i=this.dXSubViews.length; i--;) {
                subViewName = this.dXSubViews[i];

                if (subViewName in this.dXSubViewCache) {
                    subView = this.dXSubViewCache[subViewName];
                    if ('dXEnter' in subView) {
                        subView.dXEnter();
                    }

                } else {
                    subView = require('views/'+this.dXSubViews[i]);
                    subView.prototype.router = this.router;
                    subView = subView.extend({ dXScope: '#'+this.dXId });
                    subView = new subView();
                }

                subViews[subViewName] = subView;
            }

            return this.dXSubViewCache = subViews;
        },

        /**
         *
         */

        dXEnter: function dXEnter(propagate) {
            debug.lightgreen('prepare #'+this.dXName+' ['+(this.router.parameters||'')+']');

            var template;

            /*
             * Prepend loading screen, if configured. The template
             * is preloaded as configured in dexter.conf.js.
             */

            if (this.dXConfig.setLoading) {
                this.dXSetLoading();
            }

            /*
             * Insert view template. We can use synchronous require
             * here, because the templates are already loaded by the
             * templateLoader plugin. Used cached nodes if available.
             */

            if (!this.dXCache) {
                template = require('text!templates/'+this.dXName+'.html');

                if ('dXTemplateData' in this) {

                    try {
                        template = mustache.render(template,
                            typeof this.dXTemplateData === 'function'?
                                this.dXTemplateData() : this.dXTemplateData);

                    } catch(err) {
                        debug.palevioletred('stopped #'+this.dXName+': '+err);
                        return;
                    }
                }

            } else {
                debug.lightgray('get cached template for #'+this.dXName);
                template = this.dXCache;
            }

            /*
             * Empty container and insert template. Set unique id for
             * further dom access.
             */

            this.dXInsert(template);

            /*
             * Reinsert loading screen after emptying the container.
             */

            if (this.dXConfig.setLoading) {
                this.dXSetLoading();
            }

            /*
             * Load subviews.
             */

            if (propagate !== false) {
                this.dXGetSubViews();
            }

            /*
             * Remove loading screen if configured.
             */

            if (this.dXConfig.clearLoading) {
                this.dXClearLoading();
            }

            // Call enter functions
            var self = this;
            setTimeout(function() {
                self.dXCallEnter();
            }, 0);
        },

        /**
         *
         * @param template
         */

        dXInsert: function dXInsert(template) {
            this.$el
                .empty()
                .append(template)
                .attr('id', this.dXId)
                .removeAttr('data-dX');
        },

        /**
         *
         */

        dXLeave: function dXLeave(propagate) {
            debug.palevioletred('leave #'+this.dXName);

            var i, subView;

            // Call leave functions
            this.dXCallLeave();

            /*
             * Tell subviews to leave.
             */

            if (propagate !== false) {
                for (i=this.dXSubViews.length; i--;) {
                    subView = this.dXSubViewCache[this.dXSubViews[i]];

                    if ('dXLeave' in subView) {
                        subView.dXLeave();
                    }
                }
            }

            /*
             * Cache html.
             */

            if (this.dXConfig.clearViewOnLeave) {
                this.dXCache = this.$el.children().detach();
            }
        },

        /**
         *
         */

        dXCallEnter: function dXCallEnter() {
            debug.green('enter #'+this.dXName+' ['+(this.router?this.router.parameters||'':'')+']');
            applyMaybe(this, 'enter');
        },

        /**
         *
         */

        dXCallLeave: function dXCallLeave() {
            applyMaybe(this, 'leave');
        },

        /**
         * Prepend the loading screen. The template
         * is preloaded as configured in dexter.conf.js.
         */

        dXSetLoading: function dXSetLoading() {
            this.$el.prepend(require('text!templates/loading.html'));
        },

        /**
         *
         */

        dXClearLoading: function dXClearLoading() {
            this.$el.children('.loading').remove();
        }

    });
});