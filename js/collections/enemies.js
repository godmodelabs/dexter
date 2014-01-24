define([
    'underscore',
    'jquery',
    'backbone',
    'collections/dXCollection',
    'models/enemy',
    'views/enemy',
    'configs/game.conf'
], function(
    _, $,
    Backbone,
    dXCollection,
    EnemyModel,
    EnemyView,
    gameConfig
) {

    /**
     * This collection stores the enemy models, which are displayed on
     * the space field. It can calculate collisions and fill
     * itself. Look at the registered events for further information.
     *
     * @class EnemiesCollection
     * @author Tamas-Imre Lukacs
     */

    return dXCollection.extend(/** @lends EnemiesCollection.prototype */{
        model: EnemyModel,
        view: EnemyView,

        /**
         * Listen to events coming through the pipe.
         */

        initialize: function() {
            dXCollection.prototype.initialize.call(this);

            var that = this;

            /**
             * Fill this collection with enemies on
             * stage selection.
             *
             * @event stage
             */

            this.dXPipe.on('stage', function(name) {
                if (gameConfig.stages.hasOwnProperty(name)) {
                    that.fill(gameConfig.stages[name]);
                }
            });

            /**
             * Get the closest enemy corresponding to the given x and y
             * coordinates. Emit a boom event, if a collision occurred.
             * If the collection is empty, emit stop instead.
             *
             * @event checkCollision
             */

            this.dXPipe.on('checkCollision', function(x, y) {
                var closest = that.getClosest(x, y);

                if (closest !== null) {
                    that.remove(closest);
                    setTimeout(function() {
                        that.dXPipe.emit(that.length === 0?
                            'stop' : 'boom');
                    }, 1);
                }
            });

            /*
             * Start and stop the enemy movement calculations.
             */

            this.dXPipe.on('start', this.start);
            this.dXPipe.on('stop', this.stop);
        },

        /**
         * Fill this collection with enemies. The positions will be
         * defined in an 2-dimensional array, given as first argument.
         * Negative values in the config refer to blank spaces.
         *
         * @param config
         */

        fill: function(config) {
            this.reset();

            var that = this,
                x, y, spaces,
                passes = 0,
                width = EnemyModel.prototype.defaults.width,
                height = EnemyModel.prototype.defaults.height;

            _.forEach(config, function(row, rowIndex) {
                _.forEach(row, function(column) {

                    spaces = Math.abs(column);

                    if (column>0) {
                        _.times(spaces, function(count) {
                            x = (count+passes)*width;
                            y = rowIndex*height;

                            that.add({
                                x: x, sX: x,
                                y: y, sY: y
                            });
                        });
                    }

                    passes += spaces;
                });

                passes = 0;
            });
        },

        /**
         * Get the closest enemy model in reference to
         * the given x, y coordinates.
         *
         * @param x
         * @param y
         */

        getClosest: function(x, y) {
            if (this.length === 0) { return null; }

            var height = this.container.$el.height();

            if (y > height+50) { return -1; }

            var enemiesX = this.pluck('x'),
                enemiesY = this.pluck('y'),
                toCenter = this.at(0).get('width')/2,
                dist, i;

            for (i=enemiesX.length; i--;) {
                dist = Math.sqrt(
                    Math.pow(enemiesX[i]+toCenter-x, 2) +
                    Math.pow(height-(enemiesY[i]+toCenter)-y, 2));

                if (dist < toCenter) {
                    break;
                }
            }

            return i >= 0? this.at(i) : null;
        },


        /**
         * Flag to save the current direction the enemies are flying.
         */

        isForward: true,

        /**
         * Start the enemy movement. Reposition the enemy units
         * by writing new coordinates to their models in this
         * collection.
         */

        start: function() {
            var that = this,
                width, height,
                stepX, stepY,
                x, change;

            this.interval = setInterval(function() {
                width = that.container.$el.width();
                height = that.container.$el.height();
                stepX = width/gameConfig.enemy.stepsX;
                stepY = height/gameConfig.enemy.stepsY;
                x = that.pluck('x');

                change = that.isForward?
                    Math.max.apply(null, x)+stepX >= width :
                    Math.min.apply(null, x)-stepX <= 0;

                that.forEach(function(enemy, index) {
                    enemy.set(change? 'y':'x', change?
                        enemy.get('y')+stepY :
                        that.isForward? x[index]+stepX : x[index]-stepX);
                });

                if (change) {
                    that.isForward = !that.isForward;
                }
            }, 800);
        },

        /**
         * Stop the enemy movement.
         */

        stop: function() {
            clearInterval(this.interval);
        }
    });

});