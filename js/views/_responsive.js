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
    'views/_view',
    'configs/states.conf',
    'ssm',
    'libs/getKeys',
    'libs/applyMaybe',
    'shim!Array.prototype.indexOf'
], function(debug, $, _, Backbone, View, states, ssm, getKeys, applyMaybe) {
    debug = debug('DX');

    var viewList, isSSMPrepared, isRender;

    viewList = {};
    isSSMPrepared = false;
    isRender = false;

    return View.extend({

        /**
         *
         */
        render: function(callback) {
            debug.colored('render #'+this.name, '#d952dc');

            var id, state, self;

            self = this;
            callback = callback || function() {};

            /*
             * Prepare SimpleStateManager.
             */
            if(!isSSMPrepared) {
                for (id in states) {
                    if (states.hasOwnProperty(id)) {

                        state = {
                            id: id,
                            width: states[id],
                            onEnter: (function(state) {
                                return function() {
                                    var view, viewName;

                                    for (viewName in viewList) {
                                        if (viewList.hasOwnProperty(viewName)) {
                                            view = viewList[viewName];

                                            view.ssmState = state;

                                            if (!isRender) {
                                                debug.colored('enter #'+view.name+' ['+(view.parameters||'')+']', '#22dd22');
                                                applyMaybe(view, 'enter');

                                                debug.colored('enter ('+state+') #'+view.name+' ['+(view.parameters||'')+']', '#22dd22');
                                                applyMaybe(view, 'enter'+state);
                                            }
                                        }
                                    }
                                }
                            })(id)
                        };
                        ssm.addState(state);

                    }
                }
                isSSMPrepared = true;
            }

            viewList[this.name] = this;

            /*
             * Call appropriate state functions.
             */

            self.update(function renderUpdate() {

                self.$cachedEl = self.$el.html();
                debug.colored('cache html for #'+self.name+': '+self.$cachedEl.substr(0,20).replace(/\n|\r|\t/g, '')+'...', 'lightgray');

                isRender = true;
                ssm.ready();
                isRender = false;

                debug.colored('enter #'+self.name+' ['+(self.parameters||'')+']', '#22dd22');
                applyMaybe(self, 'enter');

                debug.colored('enter ('+self.ssmState+') #'+self.name+' ['+(self.parameters||'')+']', '#22dd22');
                applyMaybe(self, 'enter'+self.ssmState);

                callback();
            });
        }
    });

});