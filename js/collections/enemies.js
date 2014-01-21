define([
    'underscore',
    'jquery',
    'backbone',
    'collections/dXCollection',
    'models/enemy',
    'views/enemy'
], function(
    _, $,
    Backbone,
    dXCollection,
    EnemyModel,
    EnemyView
) {

    return dXCollection.extend({
        model: EnemyModel,
        view: EnemyView,

        /**
         *
         */

        initialize: function() {
            this.fill([
                [-2,1,-5,1],
                [-3,1,-3,1],
                [-2,7],
                [-1,2,-1,3,-1,2],
                [11],
                [1,-1,7,-1,1],
                [1,-1,1,-5,1,-1,1],
                [-3,2,-1,2,-3]
            ]);
        },

        /**
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
        }
    });

});