const homeController = require('../controllers/homeController');
const aboutController = require('../controllers/aboutController');
const createController = require('../controllers/createController');
const detailsController = require('../controllers/detailsController');
const notFoundController = require('../controllers/notFoundController');
const attachAccessoryController = require('../controllers/accessoryController');
const loginController = require('../controllers/loginController');
const registerController = require('../controllers/registerController');

module.exports = (app) => {
    app.use(homeController);
    app.use('/about', aboutController);
    app.use('/create', createController);
    app.use('/details', detailsController);
    app.use('/attach', attachAccessoryController);
    app.use('/login', loginController);
    app.use('/register', registerController);
    app.use('*', notFoundController);
};
