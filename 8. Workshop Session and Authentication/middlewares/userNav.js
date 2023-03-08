module.exports = () => (req, res, next) => {
    if (req.user) {
        res.locals.hasUser = true;
        res.locals.username = req.user.username;
        res.locals.isAdmin = req.user.roles.includes('admin');
    }

    next();
};
