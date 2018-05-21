const fs = require('fs');
let fileName = '/Users/cuppi/Desktop/IDouPiao/sdktester/src/jbzwebsdk/node_modules/ink-docstrap/template/static/fonts/glyphicons-halflings-regular.eot';
let toFile = './comment/fonts/glyphicons-halflings-regular.eot';
fs.copyFileSync( fileName, toFile );
