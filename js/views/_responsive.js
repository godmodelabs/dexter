/**
 *
 *
 * @author: Tamas-Imre Lukacs
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'views/_view',
    'configs/states.conf',
    'ssm',
    'libs/getKeys',
    'libs/applyMaybe',
    'shim!Array.prototype.indexOf'
], function($, _, Backbone, View, states, ssm, getKeys, applyMaybe) {

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
        render: function() {
            var id, state;

            /*
             * Prepare SimpleStateManager.
             */
            for (id in states) {
                if (states.hasOwnProperty(id)) {
                    state = {
                        id: id,
                        width: states[id],
                        onEnter: (function(id, view) {
                            return function() {
                                var i, l;

                                for (i=0, l=sortedStates.indexOf(id); i<=l; i++) {
                                    applyMaybe(view, 'draw'+sortedStates[i]);
                                }
                            }
                        })(id, this)
                    };
                    ssm.removeState(state.id);
                    ssm.addState(state);
                }
            }

            /*
             * Call appropriate state functions.
             */
            applyMaybe(this, 'draw');
            ssm.ready();
        }
    });

});