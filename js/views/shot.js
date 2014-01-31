define([
    'libs/debug',
    'underscore',
    'jquery',
    'views/dXView',
    'models/shot'
], function(
    debug,
    _, $,
    dXView,
    Shot
) {

    /**
     * View for the projectile. Updates the position and visibility
     * of the container if the model changes values.
     *
     * @class ShotView
     * @author Riplexus <riplexus@gmail.com>
     */

    return dXView.extend(/** @lends ShotView.prototype */{
        dXName: 'shot',

        /**
         * Data model for the shot. Manages the flying and
         * collision behaviour.
         */

        model: new Shot(),

        /**
         * Subscribe to data changes and apply them to
         * the container.
         */

        initialize: function() {
            dXView.prototype.initialize.call(this);

            this.model.on('change:x', function(model, x) {
                this.$el.css('left', x);
            }.bind(this));

            this.model.on('change:y', function(model, y) {
                this.$el.css('bottom', y);
            }.bind(this));

            this.dXPipe.on('pew', function() {
                this.$el.addClass('flying');
            }.bind(this));

            this.dXPipe.on('boom', function() {
                this.$el.removeClass('flying');
            }.bind(this));
        }
    });

});