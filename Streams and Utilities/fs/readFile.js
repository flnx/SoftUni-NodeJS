const fs = require('fs');
const fsp = require('fs/promises');

// Synchronous reading from file
const text = fs.readFileSync('./data.txt', { encoding: 'utf-8' });

console.log(text);

// Asynchronous reading from file

const asyncText = fs.readFile(
    './data.txt',
    { encoding: 'utf-8' },
    (err, data) => {
        if (err) {
            return;
        }

        console.log(data);
    }
);

// Asynchronous reading with promises

fsp.readFile('./data.txt', { encoding: 'utf-8' }).then((result) => {
    console.log(result);
});

fsp.readdir('./', { encoding: 'utf-8' }).then((result) => {
    console.log(result[0]);
});
