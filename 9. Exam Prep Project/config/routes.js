const homeController = require('../controllers/homeController');
const catalogController = require('../controllers/catalogController');
const loginController = require('../controllers/loginController');
const registerController = require('../controllers/registerController');
const searchController = require('../controllers/searchController');
const createController = require('../controllers/createController');
const editController = require('../controllers/editController');
const detailsController = require('../controllers/detailsController');
const notFoundController = require('../controllers/notFoundController');
const logoutController = require('../controllers/logoutController');

// guards
const { isAuthenticated, isGuest } = require('../middlewares/guards');


module.exports = (app) => {
    app.use(homeController);
    app.use('/login', isGuest(), loginController);
    app.use('/register', isGuest(), registerController);
    app.use('/create', isAuthenticated(), createController);
    app.use('/edit', isAuthenticated(), editController);
    app.use('/catalog', catalogController);
    app.use('/search', searchController);
    app.use('/details', detailsController);
    app.use('/logout', logoutController);
    app.use('*', notFoundController);
};
