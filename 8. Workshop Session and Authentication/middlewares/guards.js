function hasUser() {
    return (req, res, next) => {
        if (req.user) {
            next();
        } else {
            res.redirect('/auth/login');
        }
    };
}

function isGuest() {
    return (req, res, next) => {
        if (req.user) {
            res.redirect('/');
        } else {
            next();
        }
    };
}

function hasRole(role) {
    return (req, res, next) => {
        if (!req.user || !req.user.roles.includes(role)) {
            res.redirect('/login');
        } else {
            next();
        }
    };
}

module.exports = {
    hasUser,
    isGuest,
};
