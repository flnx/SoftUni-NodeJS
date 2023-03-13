const jwt = require('../lib/jwt');

require('dotenv').config();

module.exports = () => async (req, res, next) => {
    const token = req.cookies['jwt'];

    if (token) {
        try {
            const decodedToken = await jwt.verify(token, process.env.SECRET);

            req.user = decodedToken;
            req.isAuthenticated = true;

            res.locals.username = decodedToken.username;
            res.locals.isAuthenticated = true;
        } catch (err) {
            console.log(err.message);

            res.clearCookie('jwt');
            res.redirect('/404');
        }
    }

    next();
};
