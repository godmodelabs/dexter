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
        jquery: '../bower_components/jquery/jquery',
        underscore: '../bower_components/underscore/underscore',
        backbone: '../bower_components/backbone/backbone',
        epoxy: 'libs/backbone.epoxy',
        modernizr: '../bower_components/modernizr/modernizr',
        mustache: '../bower_components/mustache/mustache',
        ssm: '../bower_components/SimpleStateManager/src/ssm',
        eventemitter2: '../bower_components/eventemitter2/lib/eventemitter2',

        // Plugins
        text: './plugins/text',
        viewLoader: './plugins/viewLoader',
        templateLoader: './plugins/templateLoader',
        shim: './plugins/shim',
        json: '../bower_components/requirejs-plugins/src/json',
        noext: '../bower_components/requirejs-plugins/src/noext',

        // Testing
    },
    shim: {
        underscore: {
            exports: '_'
        },
        modernizr: {
            exports: 'Modernizr'
        },
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        ssm: {
            exports: 'ssm'
        },
        'libs/debug': {
            deps: ['configs/debug.conf'],
            exports: 'debug'
        },
        'epoxy': {
            deps: ['backbone'],
            exports: 'Backbone'
        },
        'libs/uuid': {
            exports: 'uuid'
        }

//        'sinon':            { exports: 'sinon' },
//        'sinon-chai':       { exports: 'sinon' },
//        'sinon/assert':     { deps: ['sinon'], exports: 'sinon' },
//        'sinon/call':       { deps: ['sinon'], exports: 'sinon' },
//        'sinon/collection': { deps: ['sinon'], exports: 'sinon' },
//        'sinon/match':      { deps: ['sinon'], exports: 'sinon' },
//        'sinon/mock':       { deps: ['sinon'], exports: 'sinon' },
//        'sinon/sandbox':    { deps: ['sinon'], exports: 'sinon' },
//        'sinon/spy':        { deps: ['sinon'], exports: 'sinon' },
//        'sinon/stub':       { deps: ['sinon'], exports: 'sinon' },
//        'sinon/test':       { deps: ['sinon'], exports: 'sinon' },
//        'sinon/test_case':  { deps: ['sinon'], exports: 'sinon' },
//        'sinon/util/event':                 { deps: ['sinon'], exports: 'sinon' },
//        'sinon/util/fake_server':           { deps: ['sinon'], exports: 'sinon' },
//        'sinon/util/fake_server_with_clock':{ deps: ['sinon'], exports: 'sinon' },
//        'sinon/util/fake_timers':           { deps: ['sinon'], exports: 'sinon' },
//        'sinon/util/fake_xml_http_request': { deps: ['sinon'], exports: 'sinon' },
//        'sinon/util/timers_ie':             { deps: ['sinon'], exports: 'sinon' },
//        'sinon/util/xhr_ie':                { deps: ['sinon'], exports: 'sinon' }
    },

    // ask Require.js to load these files (all our tests)
    deps: tests,

    // start test run, once Require.js is done
    callback: window.__karma__.start,

    enforceDefine: true
});