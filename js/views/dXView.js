define([
    'libs/debug',
    'underscore',
    'jquery',
    'backbone',
    'libs/uuid',
    'libs/applyMaybe',
    'libs/pipe',
    'epoxy',
    'shim!Function.prototype.bind',
    'shim!Object.keys'
], function(
    debug,
    _, $,
    Backbone,
    uuid,
    applyMaybe,
    pipe
) {

    debug = debug('DX');

    /**
     * This is the basic view of the dexter framework. It
     * defined the required attributes and methods, prefixed
     * with dX. dXView supports subViews, loading element
     * injection, unique identifiers, enter and leave methods,
     * automatic template loading and html caching.
     *
     * @class dXView
     * @author Riplexus <riplexus@gmail.com>
     * @example
     * dXView.extend({
     *   dXName: 'myView',
     *
     *   initialize: function() {},
     *   enter: function() {},
     *   leave: function() {}
     * });
     */

    var dXView = Backbone.Epoxy.View.extend(/** @lends dXView.prototype */{

        /**
         * Generate a unique id for this view and call
         * {@link dXView#dXEnter} afterwards to insert the
         * template.
         */

        initialize: function initialize() {
            this.dXId = 'dX-' + uuid();
            this.dXConnect();
            this.dXEnter();
        },

        /**
         * This method will be called by Backbone. It returns
         * a css selector for the desired location of the
         * template. Dexter uses elements with data-dX attributes.
         * To reduce the DOM lookup time, use the scope (of a
         * potential parent element) if available.
         *
         * @returns {string}
         */

        el: function el() {
            return this.dXScope += ' [data-dX='+this.dXName+'-'+this.dXIndex+']';
        },

        /**
         *
         */

        $el: null,

        /**
         * The id of this view. A uuid will be generated on
         * initialization and assigned. The element containing
         * this views template in the DOM will have his id set
         * to this value.
         */

        dXId: null,

        /**
         *
         */

        dXIndex: 0,

        /**
         *
         */

        dXName: null,

        /**
         * A CSS selector to reduce DOM lookup time on initializing
         * this view. Useful if this is used as a subView.
         */

        dXScope: '',

        /**
         * If the view is not needed (e.g. because the user
         * navigates away), the template will be detached and
         * cached here for further reuse.
         */

        dXCache: null,

        /**
         * The real, relative path to this view. It can be system
         * specific (e.g. android/view) and will be set by the
         * view loader.
         * Used by the template loader to get the views template.
         */

        dXPath: null,

        /**
         * The real, relative paths to this views subViews, if there
         * are any mentioned in {@link dXView#dXSubViews}. It can be
         * system specific (e.g. android/view) and will be set by the
         * view loader.
         * Used by {@link dXView#dXGetSubViews}.
         */

        dXSubViewPaths: {},

        /**
         * This array contains a list of the required subviews for
         * this view. They will be loaded and managed without
         * further developer input.
         * Overwrite this array to register subviews.
         * It can contain any system specific declarations
         * (e.g. 'android!view').
         */

        dXSubViews: [],

        /**
         * The subview cache contains the instances of the subviews.
         * They are always extending dXView. The keys are the
         * subview dXNames.
         */

        dXSubViewCache: {},

        /**
         * This object contains the behaviour configuration of a
         * dXView mostly in form of flags.
         * The injection of the loading screen can be disabled,
         * if not needed. If your view uses asynchronous rendering,
         * set clearLoading to false and call {@link dXView#dXClearLoading}
         * manually. If you want to leave the view present after
         * leaving, set the flag here. The template name can be
         * overwritten too (defaults to the provided dXName).
         */

        dXConfig: {
            clearViewOnLeave: true,
            setLoading: true,
            clearLoading: true,
            templateName: null
        },

        /**
         * A reference to the application dXRouter. Will be set by the
         * router himself.
         */

        dXRouter: null,

        /**
         * Tries to return every subview mentioned in {@link dXView#dXSubViewPaths}.
         * If a view is not yet cached, create a new instance and
         * add this scope.
         *
         * @returns {object} Returns the {@link dXView#dXSubViewCache}.
         */

        dXGetSubViews: function dXGetSubViews() {
            var i, subView, SubView, subViews, subViewName, subViewNames,
                that = this;

            subViews = {};
            subViewNames = Object.keys(this.dXSubViewPaths);

            for (i=subViewNames.length; i--;) {
                subViewName = subViewNames[i];
                subView = [];

                if (subViewName in this.dXSubViewCache) {
                    subView = this.dXSubViewCache[subViewName];
                    _.each(subView, function(view) {
                        if ('dXEnter' in view) {
                            view.dXEnter();
                        }
                    });

                } else {
                    SubView = require('views/'+this.dXSubViewPaths[subViewName]);
                    this.$el.find('[data-dX='+subViewName+']').each(function(index) {
                        var $this = $(this);
                        $this.attr('data-dX', subViewName+'-'+index);

                        SubView = SubView.extend({
                            dXScope: '#'+that.dXId,
                            dXRouter: that.dXRouter,
                            dXIndex: index
                        });
                        subView.push(new SubView());
                    });
                }

                subViews[subViewName] = subView;
            }

            this.dXSubViewCache = subViews;

            return this.dXSubViewCache;
        },

        /**
         * This is one of the main methods of a dXView. It will be
         * called on initializing and further entering.
         * The template will be required synchronously (preloaded
         * with the dXTemplateLoader plugin), any static template data
         * will be rendered from {@link dXView#dXTemplateData} and
         * inserted with {@link dXView#dXInsert}. The loading screen
         * will be injected and removed if configured and the subviews
         * will be called via {@link dXView#dXGetSubViews}.
         *
         * @param {boolean} [propagate] If false, don't render the subviews.
         */

        dXEnter: function dXEnter(propagate) {
            debug.lightgreen('prepare #'+this.dXName+' ['+(this.dXRouter.parameters||'')+']');

            var template, templateName;

            /*
             * Prepend loading screen, if configured. The template
             * is preloaded as configured in dXViews.conf.js.
             */

            if (this.dXConfig.setLoading) {
                this.dXSetLoading();
            }

            /*
             * Insert view template. We can use synchronous require
             * here, because the templates are already loaded by the
             * dXTemplateLoader plugin. Use cached nodes if available.
             */

            if (!this.dXCache) {
                templateName = this.dXConfig.templateName || this.dXPath;
                template = require('text!templates/'+templateName+'.html');

                try {
                    template = this.dXTemplateRenderer(template,
                        typeof this.dXTemplateData === 'function' ?
                            this.dXTemplateData(this) : this.dXTemplateData);

                } catch(err) {
                    debug.palevioletred('stopped #'+this.dXName+': '+err);
                    return;
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
            setTimeout(function() {
                this.dXCallEnter();
            }.bind(this), 0);
        },

        /**
         * Insert the template into the DOM. This is detached, so you
         * can override it, if you want to insert the template into a
         * special, case-sensitive container.
         *
         * @param {string|HTMLElement} template
         */

        dXInsert: function dXInsert(template) {
            this.$el
                .empty()
                .append(template)
                .attr('id', this.dXId)
                .removeAttr('data-dX')
                .show();
        },

        /**
         * This will be called, if the view is not longer needed. It
         * tells the subviews to leave and detaches the template.
         *
         * @param {boolean} propagate If false, don't leave the subviews.
         */

        dXLeave: function dXLeave(propagate) {
            debug.palevioletred('leave #'+this.dXName);

            var i, subView,
                subViewNames = Object.keys(this.dXSubViewPaths);

            this.dXCallLeave();

            /*
             * Tell subviews to leave.
             */

            if (propagate !== false) {
                for (i=subViewNames.length; i--;) {
                    subView = this.dXSubViewCache[subViewNames[i]];

                    _.each(subView, function(view) {
                        if ('dXLeave' in view) {
                            view.dXLeave();
                        }
                    });
                }
            }

            /*
             * Cache html.
             */

            if (this.dXConfig.clearViewOnLeave) {
                this.dXCache = this.$el.contents().detach();
            }

            this.$el.attr('data-dX', this.dXName+'-'+this.dXIndex);
            this.$el.hide();
        },

        /**
         * This will be called in {@link dXView#dXEnter}. It
         * calls the views enter function, if defined.
         */

        dXCallEnter: function dXCallEnter() {
            debug.green('enter #'+this.dXName);
            applyMaybe(this, 'enter');
            this.dXPipe.emit('enter/'+this.dXName);

        },

        /**
         * This will be called in {@link dXView#dXLeave}. It
         * calls the views leave function, if defined.
         */

        dXCallLeave: function dXCallLeave() {
            applyMaybe(this, 'leave');
            this.dXPipe.emit('leave/'+this.dXName);
        },

        /**
         * Prepend the loading screen. The template
         * is preloaded as configured in dXViews.conf.js.
         * To support absolute positioned loading elements,
         * save the current position attribute and replace
         * 'static' with 'relative' until the loading
         * screen is removed.
         */

        dXSetLoading: function dXSetLoading() {
            if (this.$el.css('position') === 'static') {
                this.$el.css('position', 'relative');
                this.$el.dXPosition = 'static';
            }

            this.$el.prepend($('<div></div>')
                .addClass('loading')
                .html(require('text!templates/loading.html')));
        },

        /**
         * Remove the loading screen for this view.
         * Restore the previously saved position attribute.
         */

        dXClearLoading: function dXClearLoading() {
            if (this.$el.dXPosition) {
                this.$el.css('position', this.$el.dXPosition);
                delete this.$el.dXPosition;
            }

            this.$el.children('.loading').remove();
        },

        /**
         * This method can be overridden to provide static
         * data for the template. It can be an object or a
         * function returning an object.
         *
         * @param {object} item
         */

        dXTemplateData: function(item) {},

        /**
         * Overwrite this method with the template renderer of
         * your choice. For an example of the use of mustache,
         * look at the example branch.
         *
         * @param {string} template
         * @param {object} data
         * @returns string
         */

        dXTemplateRenderer: function(template, data) {
            return template;
        },

        /**
         * To communicate between views, distant collections
         * and models, dexter uses an event emitter as a 'Pipe
         * Network'. It can be (dis)connected with
         * {@link dXView#dXDisconnect} and {@link dXView#dXConnect}.
         */

        dXPipe: null,

        /**
         * Disconnect from the dXPipe Network. If disconnected,
         * events can still be bound, but will only be called
         * when reconnected.
         */

        dXDisconnect: function dXDisconnect() {
            this.dXPipe.isOffline = true;
        },

        /**
         * (Re)connect to the dXPipe event emitter network.
         */

        dXConnect: function dXConnect() {
            var self = this;

            if (self.dXPipe) {
                self.dXPipe.isOffline = false;
                return;
            }

            self.dXPipe = {
                isOffline: false,

                emit: function() {
                    if (!self.dXPipe.isOffline) {
                        pipe.emit.apply(self, arguments);
                    }
                },

                on: function(event, fn) {
                    (function(fn) {
                        pipe.on(event, function() {
                            if (!self.dXPipe.isOffline) {
                                fn.apply(self, arguments);
                            }
                        });
                    })(fn);
                }
            };
        }
    });

    return dXView;
});