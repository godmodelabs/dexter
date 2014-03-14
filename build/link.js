var fs = require('fs'),
    isBuild = process.argv[2] === 'set';

fs.readFile('./index.html', 'utf8', function (err,data) {
    if (err) {
        console.log(err);
        return;
    }
    
    var result;
    
    if (isBuild) {
        result = data.replace(/data-main="\/js\/main"/g, 'data-main="/js/main-build"');
    } else {
        result = data.replace(/data-main="\/js\/main-build"/g, 'data-main="/js/main"');
    }

    fs.writeFile('./index.html', result, 'utf8', function (err) {
        if (err) return console.log(err);
    });
});