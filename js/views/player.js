define([
    'libs/debug',
    'underscore',
    'jquery',
    'views/dXResponsiveView',
    'models/player',
    'shim!Function.prototype.bind'
], function(
    debug,
    _, $,
    dXResponsiveView,
    Player
) {

    /**
     * The view container showing the players character. Updates
     * the position on model data change.
     *
     * @class PlayerView
     * @author Riplexus <riplexus@gmail.com>
     */

    return dXResponsiveView.extend(/** @lends PlayerView.prototype */{
        dXName: 'player',

        /**
         * The model containing the position of the player.
         */

        model: new Player(),

        /**
         * Listen on coordinate changes and update the position
         * of this view.
         */

        initialize: function() {
            dXResponsiveView.prototype.initialize.call(this);

            this.model.on('change:x', function(model, x) {
                this.$el.css('margin-left', x);
            }.bind(this));
        },

        /**
         * Save the view width in the model to calculate
         * the center of the player.
         */

        enter: function() {
            this.model.set('width', this.$el.width());
        }
    });

});