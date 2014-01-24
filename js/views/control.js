define([
    'libs/debug',
    'underscore',
    'jquery',
    'views/dXResponsiveView'
], function(
    debug,
    _, $,
    dXResponsiveView
) {

    /**
     * Basic user control view. Emits start and stop events if the user
     * clicks on the enemy space.
     *
     * @class ControlView
     * @author Tamas-Imre Lukacs
     */

    return dXResponsiveView.extend(/** @lends ControlView.prototype */{
        dXName: 'control',

        /**
         * Register a click event on the whole view element.
         */

        events: {
            'click': 'toggle'
        },

        /**
         * Load stage 'one' if the game starts for the first time.
         * Emit the start and stop events on click on the enemy space.
         */

        toggle: function() {
            if (this.running === undefined) {
                this.dXPipe.emit('stage', 'one');
            }

            this.running = !this.running;

            this.dXPipe.emit(this.running?
                'start' : 'stop');

            $('body')[this.running?
                'addClass' : 'removeClass']('running');
        }
    });

});