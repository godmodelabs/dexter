/**
 *
 *
 * @author: Tamas-Imre Lukacs
 */

define([
    'libs/debug',
    'jquery',
    'underscore',
    'backbone',
    'mustache',
    'libs/applyMaybe',
    'libs/step'
], function(debug, $, _, Backbone, Mustache, applyMaybe, Step) {
    debug = debug('DX');

    function getTemplate(view) {
        debug.colored('get template for #'+view.name, '#dada65');

        require(['text!templates/'+view.name+'.html'], function(template) {
            debug.colored('got template for #'+view.name, '#dada65');

            view._templateFile = template;
            view._isTemplateLoaded = true;
            view._isTemplateLoading = false;

            view.update.call(view);
        });
    }

    return Backbone.View.extend({

        _isTemplateLoaded: false,
        _isTemplateLoading: false,
        _updateCallbacks: null,
        _templateFile: null,

        subViews: [],

        /**
         *
         * @returns {HTMLElement}
         */
        el: function el() {
            return $('#'+this.name);
        },

        /**
         *
         */
        render: function render(callback) {
            debug.colored('render #'+this.name, '#d952dc');

            var self;

            self = this;
            callback = callback || function() {};

            self.update(function renderUpdate() {

                self.$cachedEl = self.$el.html();
                debug.colored('cache html for #'+self.name+': '+self.$cachedEl.substr(0,20).replace(/\n|\r|\t/g, '')+'...', 'lightgray');

                debug.colored('enter #'+self.name+' ['+(self.parameters||'')+']', '#22dd22');
                applyMaybe(self, 'enter');

                callback();
            });
        },

        /**
         *
         */
        update: function update(callback) {
            debug.colored('update #'+this.name+' [template? '+this._isTemplateLoaded+' callback? '+(typeof callback==='function')+']', '#d992dc');

            var template, data, self;

            self = this;

            /*
             * Callback stack.
             */

            if (!self._updateCallbacks) {
                self._updateCallbacks = [];
            }
            if (callback) {
                self._updateCallbacks.push(callback);
                debug.colored('put update callback on stack for #'+self.name+' -> '+self._updateCallbacks.length, '#d992dc');
            }

            /*
             * Basic view uses lazy template loading.
             */

            if (!self._isTemplateLoaded) {

                if (!self._isTemplateLoading) {
                    self._isTemplateLoading = true;
                    getTemplate(self);
                }
                return;
            }

            data = applyMaybe(self, 'templateData');

            /*
             * If we got data from the view, render it with mustache.
             */

            if (data === null) {
                template = self._templateFile;
            } else {
                template = Mustache.render(self._templateFile, data);
            }

            self.$el.html(template);

            /*
             * Update sub views.
             */

            Step(
                function subViews() {
                    if (self.subViews.length > 0) {
                        self.router.loadSubViews(self, this);
                    } else {
                        return true;
                    }
                },
                function () {
                    while(self._updateCallbacks.length) {
                        var callback = self._updateCallbacks.shift();

                        debug.colored('call update callback for #'+self.name+' -> '+self._updateCallbacks.length, '#d992dc');

                        callback.call(self);
                    }
                }
            );
        },

        /**
         *
         */
        clear: function clear() {
            this.$el.html('');
        }
    });

});