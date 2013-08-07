/**
 *
 *
 * @author: Tamas-Imre Lukacs
 */

define([
    'libs/debug',
    'jquery',
    'backbone',
    'mustache',
    'libs/applyMaybe',
    'libs/step',
    'text!templates/loading.html'
], function(debug, $, Backbone, Mustache, applyMaybe, Step, tLoading) {
    debug = debug('DX');

    /**
     *
     */
    return Backbone.View.extend({

        dXIsTemplateLoaded: false,
        dXIsTemplateLoading: false,
        dXUpdateCallbacks: null,
        dXTemplateFile: null,
        dXIsActive: false,

        dXIsSetLoading: true,
        dXIsClearLoading: true,

        dXSubViews: [],

        /**
         *
         * @returns {HTMLElement}
         */

        el: function el() {
            return $('[data-dXId='+this.dXName+']');
        },

        /**
         *
         */

        render: function render(callback) {
            debug.colored('render #'+this.dXName, '#d952dc');

            var self;

            self = this;
            callback = callback || function() {};

            self.dXUpdate(function renderUpdate() {

                self.dXCallEnter();

                callback();
            });
        },

        /**
         *
         * @param callback
         */

        dXUpdate: function dXUpdate(callback) {
            debug.colored('update #'+this.dXName+' [template? '+this.dXIsTemplateLoaded+' callback? '+(typeof callback==='function')+']', '#d992dc');

            var i, template, data, self, subview, subviewName, $subview;

            self = this;

            /*
             * Set loading screen for the first call of <dXUpdate>.
             */

            if (self.dXIsSetLoading) {
                self.dXSetLoading();
            }

            /*
             * Callback stack.
             */

            if (!self.dXUpdateCallbacks) {
                self.dXUpdateCallbacks = [];
            }
            if (callback) {
                self.dXUpdateCallbacks.push(callback);
                debug.colored('put update callback on stack for #'+self.dXName+' -> '+self.dXUpdateCallbacks.length, '#d992dc');
            }

            /*
             * Basic view uses lazy template loading.
             */

            if (!self.dXIsTemplateLoaded) {

                if (!self.dXIsTemplateLoading) {
                    self.dXIsTemplateLoading = true;
                    self.dXGetTemplate();
                }
                return;
            }

            /*
             * If we got data from the view, render it with mustache.
             */

            data = applyMaybe(self, 'dXTemplateData');

            if (data === null) {
                template = self.dXTemplateFile;
            } else {
                template = Mustache.render(self.dXTemplateFile, data);
            }

            /*
             * Cache subviews to prevent additional rendering.
             */

            for (i=self.dXSubViews.length; i--;) {
                subviewName = self.dXSubViews[i];
                $subview = $('[data-dXId='+subviewName+']');
                if ($subview.length > 0) {
                    subview = self.router.viewCache[subviewName];
                    if (subview) {
                        subview.$cachedEl = $subview.children().detach();
                        debug.colored('detach subview #'+subviewName+' for #'+self.dXName, 'lightgray');

                    }
                }
            }

            /*
             * Leave and empty the current view if we are routing.
             */

            if (self.router.isRouting) {
                if (self.router.currentView !== null) {
                    debug.colored('leave #'+self.router.currentView.dXName, '#aaddaa');
                    applyMaybe(self.router.currentView, 'leave');
                    self.router.currentView.dXIsActive = false;
                    self.router.currentView.$el.empty();
                }
                self.router.isRouting = false;
            }

            /*
             * Show the desired, updated view.
             */

            self.$el.html(template);

            /*
             * Set loading screen for the rest of the rendering process.
             */

            if (self.dXIsSetLoading) {
                self.$el.prepend(tLoading);
            }

            if (self.dXIsClearLoading) {
                (function(self) {
                    setTimeout(function() {
                        self.dXClearLoading();
                    }, 0);
                })(self);
            }

            self.dXIsActive = true;

            /*
             * Update subviews.
             */

            Step(
                function subViews() {
                    if (self.dXSubViews.length > 0) {
                        self.router.loadSubViews(self, this);
                    } else {
                        return true;
                    }
                },
                function callCallbacks() {
                    while(self.dXUpdateCallbacks.length) {
                        var callback = self.dXUpdateCallbacks.shift();

                        debug.colored('call update callback for #'+self.dXName+' -> '+self.dXUpdateCallbacks.length, '#d992dc');

                        callback.call(self);
                    }
                }
            );
        },

        /**
         *
         */

        dXSetLoading: function() {
            if (!this.dXIsLoading) {
                this.$el.prepend(tLoading);
                this.dXIsLoading = true;
            }
        },

        /**
         *
         */

        dXClearLoading: function() {
            this.$el.find('.loading').remove();
            this.dXIsLoading = false;
        },

        /**
         *
         */

        dXCallEnter: function dXCallEnter() {
            debug.colored('enter #'+this.dXName+' ['+(this.router.parameters||'')+']', '#22dd22');
            applyMaybe(this, 'enter');
        },

        /**
         *
         */

        dXGetTemplate: function dXGetTemplate() {
            debug.colored('get template for #'+this.dXName, '#dada65');

            var self;

            self = this;

            require(['text!templates/'+self.dXName+'.html'], function dXGetTemplateCallback(template) {
                debug.colored('got template for #'+self.dXName, '#dada65');

                self.dXTemplateFile = template;
                self.dXIsTemplateLoaded = true;
                self.dXIsTemplateLoading = false;

                self.dXUpdate();
            });
        }
    });
});