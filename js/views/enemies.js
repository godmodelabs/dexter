define([
    'libs/debug',
    'underscore',
    'jquery',
    'views/dXResponsiveView',
    'collections/enemies'
], function(
    debug,
    _, $,
    dXResponsiveView,
    EnemiesCollection
) {

    debug = debug('EXAMPLE');

    return dXResponsiveView.extend({
        dXName: 'enemies',

        dXSubViews: [
            'control'
        ],

        bindings: {
            '.group': 'collection:$collection'
        },

        collection: new EnemiesCollection(),

        initialize: function() {
            dXResponsiveView.prototype.initialize.call(this);

            this.dXPipe.on('start', this.start);
            this.dXPipe.on('stop', this.stop);
        },

        /**
         * Start the enemy movement. Reposition the enemy units
         * by writing new coordinates to the enemy models in this
         * collection.
         */

        start: function() {
            var that = this,
                stepX = that.collection.at(0).get('width'),
                stepY = 10,
                forward = true,
                x, change;

            this.interval = setInterval(function() {
                x = that.collection.pluck('x');

                change = forward?
                    Math.max.apply(null, x)+2*stepX >= that.$el.width() :
                    Math.min.apply(null, x)-stepX <= 0;

                that.collection.forEach(function(enemy, index) {
                    enemy.set(change? 'y':'x', change?
                        enemy.get('y')+stepY :
                        forward? x[index]+stepX : x[index]-stepX);
                });

                if (change) {
                    forward = !forward;
                }
            }, 1000);
        },

        /**
         * Stop the enemy movement.
         */

        stop: function() {
            clearInterval(this.interval);
        }
    });

});