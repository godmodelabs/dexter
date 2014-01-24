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
     * The player model can shoot projectiles. It simply emits events
     * through the pipe and the shot model will do the rest.
     *
     * @class PlayerModel
     * @author Tamas-Imre Lukacs
     */

    return dXModel.extend(/** @lends PlayerModel.prototype */{

        /**
         * Register on the desired events to manage the
         * automatic shooting.
         */

        initialize: function() {
            dXModel.prototype.initialize.call(this);

            var that = this;

            /**
             * Update the model data on player movement.
             *
             * @event
             */

            this.dXPipe.on('playerMove', function(x) {
                that.set('center', x);
                x -= that.get('width')/2;
                that.set('x', x);
            });

            /**
             * Start shooting on game start.
             *
             * @event start
             */

            this.dXPipe.on('start', function() {
                that.started = true;

                setTimeout(function() {
                    that.shoot();
                }, 500);
            });

            /**
             * Stop the shooting loop on game end.
             *
             * @event stop
             */

            this.dXPipe.on('stop', function() {
                that.started = false;
            });

            /**
             * If the projectile reaches an enemy or
             * the stage border, it explodes and the
             * boom event will be fired. Fire another
             * one, if the game is still running.
             *
             * @event boom
             */

            this.dXPipe.on('boom', function() {
                if (that.started) {
                    setTimeout(function() {
                        that.shoot();
                    }, 1);
                }
            });
        },

        /**
         * To shoot one projectile, simply emit the pew event. The shot
         * model will listen and act independently.
         */

        shoot: function() {
            this.dXPipe.emit('pew', this.get('center'));
        }

    });

});