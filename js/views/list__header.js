define([
    'libs/debug',
    'underscore',
    'jquery',
    'mustache',
    'views/dXResponsiveView'
], function(
    debug,
    _, $,
    Mustache,
    dXResponsiveView
) {

    debug = debug('EXAMPLE');

    return dXResponsiveView.extend({

        dXName: 'list__header',

        dXSubViews: ['list__header__sub'],

        dXTemplateData: {
            'title': 'Header'
        }
    });

});