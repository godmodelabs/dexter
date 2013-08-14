define([
    'libs/debug',
    'underscore',
    'jquery',
    'mustache',
    'views/dXView'
], function(
    debug,
    _, $,
    Mustache,
    dXView
) {

    debug = debug('EXAMPLE');

    return dXView.extend({
        dXName: 'navigation'
    });

});