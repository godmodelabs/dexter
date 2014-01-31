define([
    'libs/debug',
    'underscore',
    'jquery',
    'views/dXResponsiveView',
    'collections/enemies',
    'configs/game.conf'
], function(
    debug,
    _, $,
    dXResponsiveView,
    EnemiesCollection
) {

    /**
     * The enemies view contains the enemies collection. This container
     * is responsive and the collection have to have a reference to this
     * to get the current dimensions.
     *
     * @class SpaceView
     * @author Riplexus <riplexus@gmail.com>
     */

    return dXResponsiveView.extend(/** @lends SpaceView.prototype */{
        dXName: 'space',

        /**
         * Load the control, shot and playground views.
         */

        dXSubViews: [
            'control',
            'shot',
            'playground'
        ],

        /**
         * The content of this.collection will be bound and
         * shown in the .group container, so we don't have
         * to manage collection changes manually.
         */

        bindings: {
            '.group': 'collection:$collection'
        },

        /**
         * The collection containing the stage enemies.
         */

        collection: new EnemiesCollection(),

        /**
         * Reference this view to the collection. Needed to get the
         * current elements dimensions.
         */

        initialize: function() {
            dXResponsiveView.prototype.initialize.call(this);

            this.collection.container = this;
        }
    });

});