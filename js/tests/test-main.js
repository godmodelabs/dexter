var tests = Object.keys(window.__karma__.files).filter(function (file) {
    return /tests\/[^\/]+\/.+\.js$/.test(file);
}).map(function(file) {
    // create relative path from `baseUrl` for specs, without `.js`
    // i.e., instead of requiring `/base/test/app.js`
    // we want to require `../test/app` when the
    // baseUrl is `/base/js`
    return '../' + file.replace(/^\/base\//, '').replace(/\.js$/, '');
});

requirejs.config({
    // Karma serves files from '/base'
    baseUrl: '/base/js',

    paths: {
        templates: '../templates',
        configs: '../configs',

        // Bower components
        jquery: '../components/jquery/jquery',
        underscore: '../components/underscore/underscore',
        backbone: '../components/backbone/backbone',
        modernizr: '../components/modernizr/modernizr',
        mustache: '../components/mustache/mustache',
        chai: '../node_modules/chai/chai',
        ssm: '../components/SimpleStateManager/js/ssm.min',

        // Plugins
        text: './plugins/text',
        viewLoader: './plugins/viewLoader',
        shim: './plugins/shim'
    },
    shim: {
        'underscore': {
            exports: '_'
        },
        backbone: {
            deps: ["underscore", "jquery"],
            exports: "Backbone"
        }
    },

    // ask Require.js to load these files (all our tests)
    deps: tests,

    // start test run, once Require.js is done
    callback: window.__karma__.start,

    enforceDefine: true
});