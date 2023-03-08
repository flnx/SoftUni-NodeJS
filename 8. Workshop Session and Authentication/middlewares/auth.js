const jwt = require('jsonwebtoken');

module.exports = (jwtSecret) => (req, res, next) => {
    const token = req.cookies.jwt;
    
    if (token) {
        try {
            const data = jwt.verify(token, jwtSecret);
            req.user = data;
        } catch (err) {
            res.cookie('jwt', null, { maxAge: 0 });
            return res.redirect('/auth/login');
        }
    } 

    req.signJwt = (userData) => {
        return jwt.sign(userData, jwtSecret, { expiresIn: '4h' });
    };

    next();
};
