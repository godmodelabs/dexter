define([
    'libs/debug',
    'underscore',
    'jquery',
    'views/dXResponsiveView',
    'models/player'
], function(
    debug,
    _, $,
    dXResponsiveView,
    Player
) {

    debug = debug('EXAMPLE');

    return dXResponsiveView.extend({

        dXName: 'player',

        initialize: function() {
            dXResponsiveView.prototype.initialize.call(this);

            var that = this;

            this.model = new Player();
            this.model.on('change:x', function(model, x) {
                that.$el.css('margin-left', x);
            });

            this.dXPipe.on('playerMove', function(x) {
                x -= this.playerWidth/2;
                that.model.set('x', x);
            });
        },

        enter: function() {
            this.playerWidth = this.$el.width();
        }
    });

});