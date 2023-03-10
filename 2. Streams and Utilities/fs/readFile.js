const fs = require('fs');
const fsp = require('fs/promises');
const path = require('path');

const filePath = path.resolve(__dirname, 'data.txt');

// Synchronous reading from file
const text = fs.readFileSync(filePath, { encoding: 'utf-8' });
console.log(text);


// Asynchronous reading from with callback
fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
        return;
    }

    console.log(data);
});


// Asynchronous reading with promises
fsp.readFile(filePath, 'utf-8')
    .then((result) => {
         console.log(result);
});

// async/await 
(async function start() {
    const data = await fsp.readFile(filePath, 'utf-8');
    console.log(data);
})();