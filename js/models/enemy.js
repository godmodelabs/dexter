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
     * The enemy model stores his start and
     * current position and his dimensions.
     *
     * @class EnemyModel
     * @author Tamas-Imre Lukacs
     */

    return dXModel.extend(/** @lends EnemyModel.prototype */{

        defaults: {
            width: 15,
            height: 15,
            x: 0,
            sX: 0,
            y: 0,
            sY: 0
        }

    });

});