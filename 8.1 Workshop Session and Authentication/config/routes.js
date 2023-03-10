const homeController = require('../controllers/homeController');
const aboutController = require('../controllers/aboutController');
const createController = require('../controllers/createController');
const detailsController = require('../controllers/detailsController');
const notFoundController = require('../controllers/notFoundController');
const attachAccessoryController = require('../controllers/accessoryController');
const loginController = require('../controllers/loginController');
const registerController = require('../controllers/registerController');
const logoutController = require('../controllers/logoutController');
const { hasUser, isGuest } = require('../middlewares/guards');

module.exports = (app) => {
    app.use(homeController);
    app.use('/about', aboutController);
    app.use('/create', hasUser(), createController);
    app.use('/attach', hasUser(), attachAccessoryController);
    app.use('/details', detailsController);
    app.use('/login', isGuest(), loginController);
    app.use('/register', isGuest(), registerController);
    app.use('/logout', hasUser(), logoutController);
    app.use('*', notFoundController);
};
