const fs = require('fs');
const zlib = require('zlib');

const gzip = zlib.createGzip();

const readStream = fs.createReadStream('./data.txt');
const writeStream = fs.createWriteStream('./data-zipped.txt');

readStream.pipe(gzip).pipe(writeStream);