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

        dXName: 'playground',
        dXSubViews: ['player'],

        initialize: function() {
            dXResponsiveView.prototype.initialize.call(this);

            var that = this,
                min, max, x,
                playerWidth = this.$el.find('.player').width();

            $('body').mousemove(function(e) {
                min = playerWidth/2;
                max = that.$el.width()-min;

                x = e.pageX > max? max :
                    e.pageX < min? min : e.pageX;

                that.dXPipe.emit('playerMove', x);
            });
        }

    });

});