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
     * @author Tamas-Imre Lukacs
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

            var that = this;

            this.model.on('change:x', function(model, x) {
                that.$el.css('left', x);
            });

            this.model.on('change:y', function(model, y) {
                that.$el.css('bottom', y);
            });

            this.dXPipe.on('pew', function() {
                that.$el.addClass('flying');
            });

            this.dXPipe.on('boom', function() {
                that.$el.removeClass('flying');
            });
        }
    });

});