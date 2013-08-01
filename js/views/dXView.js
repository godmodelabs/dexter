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
    'libs/step'
], function(debug, $, Backbone, Mustache, applyMaybe, Step) {
    debug = debug('DX');

    /**
     *
     */
    return Backbone.View.extend({

        dXIsTemplateLoaded: false,
        dXIsTemplateLoading: false,
        dXUpdateCallbacks: null,
        dXTemplateFile: null,
        dXisActive: false,

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

            var i, template, data, self, viewName, view, $view;

            self = this;

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

            data = applyMaybe(self, 'dXTemplateData');

            /*
             * save subviews
             */

            for (i=self.dXSubViews.length; i--;) {
                viewName = self.dXSubViews[i];
                $view = $('[data-dXId='+viewName+']');
                if ($view.length > 0) {
                    view = self.router.viewCache[viewName];
                    if (view) {
                        view.$cachedEl = $view.children().detach();
                        debug.colored('detach subview #'+viewName+' for #'+self.dXName, 'lightgray');

                    }
                }
            }

            /*
             * If we got data from the view, render it with mustache.
             */

            if (data === null) {
                template = self.dXTemplateFile;
            } else {
                template = Mustache.render(self.dXTemplateFile, data);
            }

            self.$el.html(template);
            self.dXisActive = true;

            /*
             * Update sub views.
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

        dXCallEnter: function dXCallEnter() {
            debug.colored('enter #'+this.dXName+' ['+(this.dXParameters||'')+']', '#22dd22');
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