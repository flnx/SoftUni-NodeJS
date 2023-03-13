const isAuthenticated = () => (req, res, next) => {
    if (req.isAuthenticated) {
        next();
    } else {
        res.redirect('/login');
    }
};

const isGuest = () => (req, res, next) => {
    if (req.isAuthenticated) {
        res.redirect('/');
    } else {
        next();
    }
};

module.exports = {
    isAuthenticated,
    isGuest,
};
