let result = [];

process.stdin.on('data', (chunk) => {
    result.push(chunk);
    console.log(result);
});
