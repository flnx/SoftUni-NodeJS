const fs = require('fs');

async function start() {
    const stream = fs.createWriteStream('./veryBigFile.txt');
    
    for (let i = 0; i < 1000000; i++) {
        const chunk = ('0000000000000000' + (Math.random() * 9999999999999999 | 0).toString(16)).slice(-16);

        await new Promise(res => {
            stream.write(chunk, res);
        });
    }

    stream.end();
}

start();