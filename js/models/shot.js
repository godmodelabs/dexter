define([
    'underscore',
    'jquery',
    'backbone',
    'models/dXModel'
], function(
    _, $,
    Backbone,
    dXModel
) {

    /**
     * The model for the flying projectile. It listens on pews and
     * trigger collision checks if it is flying.
     *
     * @class ShotModel
     * @author Tamas-Imre Lukacs
     */

    return dXModel.extend(/** @lends ShotModel.prototype */{

        defaults: {
            x: 0,
            y: 0
        },

        /**
         * Update the x position on pew start and trigger collision
         * checks if it is flying.
         */

        initialize: function() {
            dXModel.prototype.initialize.call(this);

            var that = this;

            /**
             * Starts the flying of this projectile by setting
             * his horizontal position.
             *
             * @event pew
             */

            this.dXPipe.on('pew', function(x) {
                that.set('x', x);
                that.fly();
            });

            /**
             * Stop flying, if the projectile reaches an
             * enemy or the stage border.
             *
             * @event boom
             */

            this.dXPipe.on('boom', function() {
                clearInterval(that.flying);
                that.set('y', 0);
            });

            /**
             * Stop flying on game stop.
             *
             * @event stop
             */

            this.dXPipe.on('stop', function() {
                clearInterval(that.flying);
            });
        },

        /**
         * Method to fly towards the top border of the stage. Check collision
         * after each step. The step size (updateInterval) is the resolution
         * of collision detection.
         */

        fly: function() {
            var that = this,
                updateInterval = 10,
                time = updateInterval;

            this.flying = setInterval(function() {
                time += updateInterval*2/3;
                that.set('y', time);
                that.dXPipe.emit('checkCollision', that.get('x'), time);
            }, updateInterval);
        }

    });

});