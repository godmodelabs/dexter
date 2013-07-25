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

    var sortedStates;

    /*
     * Sort states by ascending min width, defined in states.conf.js.
     */
    sortedStates = getKeys(states);
    sortedStates = sortedStates.sort(function(a, b) {
        return states[a] - states[b];
    });

    return View.extend({

        /**
         *
         */
        render: function(callback) {
            debug('render #'+this.name);

            var id, state, self;

            self = this;
            callback = callback || function() {};

            /*
             * Prepare SimpleStateManager.
             */
            for (id in states) {
                if (states.hasOwnProperty(id)) {
                    state = {
                        id: id,
                        width: states[id],
                        onEnter: (function(id) {
                            return function() {
                                var i, l;

                                for (i=0, l=sortedStates.indexOf(id); i<=l; i++) {
                                    applyMaybe(self, 'enter'+sortedStates[i]);
                                }
                            }
                        })(id)
                    };
                    ssm.removeState(state.id);
                    ssm.addState(state);
                }
            }

            /*
             * Call appropriate state functions.
             */

            self.update(function renderUpdate() {

                self.$cachedEl = self.$el.html();
                debug('cache html for #'+self.name+': '+self.$cachedEl.substr(0,20)+'...');

                callback();
                ssm.ready();
            });
        }
    });

});