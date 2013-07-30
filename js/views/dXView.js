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

        dXSubViews: [],

        /**
         *
         * @returns {HTMLElement}
         */
        el: function el() {
            return $('#'+this.dXName);
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

                debug.colored('enter #'+self.dXName+' ['+(self.dXParameters||'')+']', '#22dd22');
                applyMaybe(self, 'enter');

                callback();
            });
        },

        /**
         *
         */
        dXUpdate: function dXUpdate(callback) {
            debug.colored('update #'+this.dXName+' [template? '+this.dXIsTemplateLoaded+' callback? '+(typeof callback==='function')+']', '#d992dc');

            var template, data, self;

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
             * If we got data from the view, render it with mustache.
             */

            if (data === null) {
                template = self.dXTemplateFile;
            } else {
                template = Mustache.render(self.dXTemplateFile, data);
            }

            self.$el.html(template);

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
                function cacheHTML() {
                    self.dXCache();
                    return true;
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
        dXClear: function dXClear() {
            this.$el.html('');
        },

        /**
         *
         */
        dXCache: function cache() {
            this.$cachedEl = this.$el.html();

            var peak = this.$cachedEl.substr(0,20).replace(/\n|\r|\t/g, '');
            debug.colored('cache html for #'+this.dXName+': '+peak+'...', 'lightgray');
        },

        /**
         * 
         */
        dXGetTemplate: function dXGetTemplate() {
            debug.colored('get template for #'+this.dXName, '#dada65');
            
            var self;

            self = this;

            require(['text!templates/'+self.dXName+'.html'], function(template) {
                debug.colored('got template for #'+self.dXName, '#dada65');
    
                self.dXTemplateFile = template;
                self.dXIsTemplateLoaded = true;
                self.dXIsTemplateLoading = false;
    
                self.dXUpdate();
            });
        }
    });

});