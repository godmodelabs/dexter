// Karma configuration
// Generated on Wed Jun 19 2013 12:14:41 GMT+0200 (Mitteleuropäische Sommerzeit)


// base path, that will be used to resolve files and exclude
basePath = '';


// list of files / patterns to load in the browser
files = [
  MOCHA,
  MOCHA_ADAPTER,
  REQUIRE,
  REQUIRE_ADAPTER,
  'js/tests/test-main.js',

    // Basic
    {pattern: 'js/**/*.js', included: false},
    {pattern: 'configs/*.js', included: false},
    {pattern: 'templates/**/*.html', included: false},

    // Bower components
    {pattern: 'bower_components/jquery/jquery.js', included: false},
    {pattern: 'bower_components/underscore/underscore-min.js', included: false},
    {pattern: 'bower_components/backbone/backbone-min.js', included: false},
    {pattern: 'bower_components/modernizr/modernizr.js', included: false},
    {pattern: 'bower_components/mustache/mustache.js', included: false},
    {pattern: 'bower_components/SimpleStateManager/js/ssm.min.js', included: false},
    {pattern: 'bower_components/eventemitter2/lib/eventemitter2.js', included: false},
    {pattern: 'bower_components/sinon/lib/sinon.js', included: false},
    {pattern: 'bower_components/sinon/lib/sinon/*.js', included: false},
    {pattern: 'bower_components/sinon/lib/sinon/util/*.js', included: false},
    {pattern: 'bower_components/sinon-chai/lib/sinon-chai.js', included: false},

    // NPM modules
    {pattern: 'node_modules/chai/chai.js', included: false}
];

preprocessors = {
    'js/collections/**/*.js': 'coverage',
    'js/libs/**/*.js': 'coverage',
    'js/models/**/*.js': 'coverage',
    'js/plugins/**/*.js': 'coverage'
};


// list of files to exclude
exclude = [
  'js/main.js'
];


// test results reporter to use
// possible values: 'dots', 'progress', 'junit'
reporters = ['progress', 'coverage'];

coverageReporeter = {
    type: 'html',
    dir: 'coverage/'
};


// web server port
port = 9876;


// cli runner port
runnerPort = 9100;


// enable / disable colors in the output (reporters and logs)
colors = true;


// level of logging
// possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
logLevel = LOG_INFO;


// enable / disable watching file and executing tests whenever any file changes
autoWatch = true;


// Start these browsers, currently available:
// - Chrome
// - ChromeCanary
// - Firefox
// - Opera
// - Safari (only Mac)
// - PhantomJS
// - IE (only Windows)
browsers = ['Chrome'];


// If browser does not capture in given timeout [ms], kill it
captureTimeout = 60000;


// Continuous Integration mode
// if true, it capture browsers, run tests and exit
singleRun = false;
