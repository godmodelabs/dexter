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

    debug = debug('EXAMPLE');

    return dXResponsiveView.extend({
        dXName: 'control',

        events: {
            'click': 'toggle'
        },

        toggle: function() {
            this.running = !this.running;
            this.dXPipe.emit(this.running?
                'start' : 'stop');

            $('body')[this.running?
                'addClass' : 'removeClass']('running');
        }
    });

});