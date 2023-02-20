const fsp = require('fs/promises');
const path = require('path');

fsp.readdir(path.resolve(__dirname, '../'), 'utf-8')
    .then((result) => {
        result.forEach(x => console.log(x));
    });
