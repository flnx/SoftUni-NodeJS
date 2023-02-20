const fsp = require('fs/promises');
const path = require('path');

fsp.readdir(path.resolve(__dirname, '../stream'), { encoding: 'utf-8' }).then(
    (result) => {
        console.log(result);
    }
);