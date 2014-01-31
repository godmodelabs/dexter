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

    var viewList, currentState, state, stateName,
        dXResponsiveView;

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
                    };
                })(stateName)
            };
            ssm.addState(state);
        }
    }
    ssm.ready();

    /**
     * dXResponsiveView extends the basic dXView of the dexter
     * framework. It provides additional enter functions, dependent
     * of the current application state. States are defined in the
     * configs/states.conf.js file as a key value pair of the state
     * name and the minimum width of the page. E.g. mobile: 400
     * describes, that the application is in the state 'mobile'
     * if the page width is under 400 px.
     * The enter functions have the state name appended, e.g.
     * enterMobile and will be called on view entering and
     * application state change.
     * It uses the simple state manager to manage the states.
     *
     * @class dXResponsiveView
     * @author Riplexus <riplexus@gmail.com>
     * @example
     * dXResponsiveView.extend({
     *   dXName: 'myResponsiveView',
     *
     *   enter: function() {
     *     // Default behaviour, will be called for every state first
     *   },
     *
     *   enterMobile: function() {
     *     // For mobile only
     *   },
     *
     *   enterTablet: function() {
     *     // For tablets only
     *   },
     *
     *   enterDesktop: function() {
     *     // For big desktop only
     *   }
     * });
     */

    dXResponsiveView = dXView.extend(/** @lends dXResponsiveView.prototype */{

        /**
         * Extend the {@link dXView#initialize} method, to register
         * this view in the simple state manager.
         *
         * @augments dXView
         * @constructs dXResponsiveView object
         */

        initialize: function() {
            viewList[this.dXName] = this;
            dXView.prototype.initialize.call(this);
        },

        /**
         * Store the current application state in this attribute.
         */

        dXSsmState: currentState,

        /**
         * {@link dXView#dXCallEnter} will be extended to call
         * the appropriate state enter methods.
         *
         * @augments dXCallEnter
         */

        dXCallEnter: function() {
            dXView.prototype.dXCallEnter.call(this);

            debug.green('enter <'+currentState+'> #'+this.dXName);
            applyMaybe(this, 'enter'+currentState);
        }
    });

    return dXResponsiveView;
});