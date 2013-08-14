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
    'views/dXView',
    'configs/states.conf',
    'ssm',
    'libs/applyMaybe'
], function(
    debug,
    _, $,
    Backbone,
    dXView,
    statesConf,
    ssm,
    applyMaybe
) {

    debug = debug('DX');

    var viewList, currentState, state, stateName;

    viewList = {};
    currentState = null;

    /*
     * Initialize SimpleStateManager.
     */

    for (stateName in statesConf) {
        if (statesConf.hasOwnProperty(stateName)) {

            state = {
                id: stateName,
                width: statesConf[stateName],
                onEnter: (function(stateName) {
                    return function() {
                        debug.lightsalmon('state change to <'+stateName+'>');

                        var view, viewName;

                        currentState = stateName;

                        for (viewName in viewList) {
                            if (viewList.hasOwnProperty(viewName)) {
                                view = viewList[viewName];

                                view.dXSsmState = currentState;
                                view.dXLeave(false); // false: don't propagate
                                view.dXEnter(false); // false: don't propagate
                            }
                        }
                    }
                })(stateName)
            };
            ssm.addState(state);
        }
    }
    ssm.ready();

    /**
     *
     */

    return dXView.extend({

        /**
         *
         */

        initialize: function() {
            viewList[this.dXName] = this;
            dXView.prototype.initialize.call(this);
        },

        /**
         *
         */

        dXSsmState: currentState,

        /**
         *
         */

        dXCallEnter: function() {
            dXView.prototype.dXCallEnter.call(this);

            debug.green('enter <'+currentState+'> #'+this.dXName+' ['+(this.router?this.router.parameters||'':'')+']');
            applyMaybe(this, 'enter'+currentState);
        }
    });
});