/**
 *
 *
 * @author: Tamas-Imre Lukacs
 */

define([
    'libs/debug',
    'jquery',
    'backbone',
    'views/dXView',
    'configs/states.conf',
    'ssm',
    'libs/getKeys',
    'libs/applyMaybe',
    'shim!Array.prototype.indexOf'
], function(debug, $, Backbone, dXView, states, ssm, getKeys, applyMaybe) {
    debug = debug('DX');

    var viewList, isSSMPrepared, isRender;

    viewList = {};
    isSSMPrepared = false;
    isRender = false;

    return dXView.extend({

        /**
         *
         */

        dXSsmState: null,

        /**
         *
         */

        render: function(callback) {
            debug.colored('render #'+this.dXName, '#d952dc');

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

                                            view.dXSsmState = state;

                                            if (!isRender && view.dXisActive) {
                                                view.dXCallEnterResp();
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

            viewList[this.dXName] = this;

            /*
             * Call appropriate state functions.
             */

            self.dXUpdate(function renderUpdate() {

                self.dXCallEnter();
                self.dXCallEnterResp();

                isRender = true;
                ssm.ready();
                isRender = false;

                callback();
            });
        },

        /**
         *
         */

        dXCallEnterResp: function dXCallEnterResp() {
            debug.colored('enter ('+this.dXSsmState+') #'+this.dXName+' ['+(this.dXParameters||'')+']', '#22dd22');
            applyMaybe(this, 'enter'+this.dXSsmState);
        }
    });
});