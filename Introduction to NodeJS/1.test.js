const { calc } = require('./1.calcTest');
console.log(calc(5, 5));

const path = require('path');
console.log(path.resolve('./'));

const myURL = new URL('https://www.example.com');
console.log(myURL);

const queryString = require('querystring');

const qs = queryString.parse('year=2017&month=february');

const year = qs.year;
const month = qs.month;


console.log(year);
console.log(month);