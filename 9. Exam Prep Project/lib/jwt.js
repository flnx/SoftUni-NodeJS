const jwt = require('jsonwebtoken');

exports.sign = async (payload, secret, options) => {
    return new Promise((res, rej) => {
        jwt.sign(payload, secret, options, (err, token) => {
            if (err) {
                rej(err);
            } else {
                res(token);
            }
        });
    });
};

exports.verify = async (payload, secret, options) => {
    return new Promise((res, rej) => {
        jwt.verify(payload, secret, options, (err, token) => {
            if (err) {
                rej(err);
            } else {
                res(token);
            }
        });
    });
};

// easier way to achieve the same result 

// ? const util = require('util');
// ? const jwtCallback = require('jsonwebtoken');

/* 
? const jwt = {
?   sign: util.promisify(jwtCallback.sign),
?   verify: util.promisify(jwtCallback.verify),
? };
*/

// module.exports = jwt;
