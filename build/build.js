var fs = require('fs'),
    mainConfig = require('../js/main.js'),  
    target = './build/config.js',
    viewFolder = './js/views',
    views,
    templateFolder = './templates',
    templates,
    includes = [],
    result;

views = fs.readdirSync(viewFolder);
includes = includes.concat(views.map(function(v) {
    return 'views/'+v.replace('.js', '');
}));

templates = fs.readdirSync(templateFolder);
includes = includes.concat(templates.map(function(v) {
    return 'text!templates/'+v.replace('.js', '');
}));

result = {
    baseUrl: '../js',

    name: 'main',
    out: '../js/main-build.js',
    //optimize: 'none',
    findNestedDependencies: true,
    preserveLicenseComments: false,
    "insertRequire": ["main"],
    include: includes,
    uglify: { max_line_length: 500 },

    paths: mainConfig.paths,
    shim: mainConfig.shim,

    // Enforce define to catch 404 errors in IE
    enforceDefine: true
};

fs.writeFileSync(target, '('+JSON.stringify(result)+')');