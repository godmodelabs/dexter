define(function() {

    /**
     * Create console functions, if not available,
     * to prevent errors in browsers without console
     * support.
     *
     * @type {{log: Function, err: Function, warn: Function, trace: Function}}
     */

    window.console = {
        log: function() {},
        error: function() {},
        warn: function() {},
        trace: function() {}
    };

    return true;
});
