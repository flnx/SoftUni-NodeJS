const homeController = require('../controllers/homeController');
const catalogController = require('../controllers/catalogController');
const loginController = require('../controllers/loginController');
const registerController = require('../controllers/registerController');
const searchController = require('../controllers/searchController');
const createController = require('../controllers/createController');
const editController = require('../controllers/editController');
const detailsController = require('../controllers/detailsController');

module.exports = (app) => {
    app.use(homeController);
    app.use('/catalog', catalogController);
    app.use('/login', loginController);
    app.use('/register', registerController);
    app.use('/search', searchController);
    app.use('/create', createController);
    app.use('/edit', editController);
    app.use('/details', detailsController);
};
